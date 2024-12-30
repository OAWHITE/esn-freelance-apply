import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {FormsModule} from '@angular/forms';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {requestInterceptorInterceptor} from "./core/interceptors/request-interceptor.interceptor";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([requestInterceptorInterceptor])
    ),

  ]
};
