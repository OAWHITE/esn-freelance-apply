import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { LOCALE_ID } from '@angular/core';
import { REQUEST, RESPONSE } from './src/express.tokens';
const { createProxyMiddleware } = require('http-proxy-middleware');

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const lang = basename(serverDistFolder);
  const langPath = `/${lang}/`;
  const browserDistFolder = resolve(serverDistFolder, `../../browser/${lang}`);
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
      '*.*',
      express.static(browserDistFolder, {
        maxAge: '1y',
      })
  );

  server.use((req, res, next) => {
    const path = req.originalUrl;

    // Check if the URL contains uppercase letters
    if (/[A-Z]/.test(path)) {
      // Convert the URL path to lowercase and redirect
      const lowerPath = path.toLowerCase();
      return res.redirect(301, lowerPath);
    }

    next();
  });

  // Catch all other routes and return the index file for Angular to handle
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, headers } = req;
    commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: resolve(serverDistFolder, `../../browser/`), // publicPath does not need to concatenate the language.
          providers: [
            { provide: APP_BASE_HREF, useValue: langPath },
            { provide: LOCALE_ID, useValue: lang },
            { provide: RESPONSE, useValue: res },
            { provide: REQUEST, useValue: req },
          ],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
  });

  return server;
}
