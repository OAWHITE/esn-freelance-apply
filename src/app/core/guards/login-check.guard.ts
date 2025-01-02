import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {catchError, map, of} from "rxjs";
export const loginCheckGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  if (!token) {
    return true;
  }

  return authService.validateToken(token).pipe(
    map(response => {

        router.navigate(['/']);
        return false;
      }
    ),
    catchError(() => {
      return of(true);
    })
  );
};
