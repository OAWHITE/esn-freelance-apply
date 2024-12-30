import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {catchError, map, of} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return authService.validateToken(token).pipe(
    map(response => {
      return true;
    }),
    catchError(() => {
      // If there is an error validating the token (e.g., network issue, server error), redirect to login
      router.navigate(['/login']);
      return of(false);  // Block navigation
    }))


};
