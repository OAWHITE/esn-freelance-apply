import { CanActivateFn, Router } from '@angular/router';

export const loginCheckGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token'); // Check for token in local storage

  if (token) {
    const router = new Router(); // Instantiate Router manually
    router.navigate(['/']);
    return false; // Prevent navigation to the login page
  }

  return true; // Allow navigation to the login page
};
