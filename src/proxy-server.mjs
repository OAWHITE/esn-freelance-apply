import {app as serverEn} from './server/en/server.mjs';
import {app as serverFr} from './server/fr/server.mjs';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get directory path



function run() {
  const allowedOrigins = ["http://localhost:4000"]
  const port = process.env.PORT || 4000;
  const server = express();





  server.get('/', (req, res) => {
    res.redirect(301, '/en');
  });


  server.use('/en', serverEn());
  server.use('/fr', serverFr());



  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);

  });
}

run();
