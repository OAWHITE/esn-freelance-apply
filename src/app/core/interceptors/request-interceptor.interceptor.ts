import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

export const requestInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const document = inject(DOCUMENT)

  const token = document.defaultView?.localStorage?.getItem('access_token');
  if (token) {
    // Clone the request and add the Authorization header with Bearer token
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pass the cloned request to the next handler
    return next(clonedRequest);
  }
  return next(req);
};
