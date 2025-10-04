import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../api/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  const allowedRoles = route.data['roles'] as Array<'ADMIN' | 'CUSTOMER'>;

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles && userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  // Redirect to unauthorized page
  router.navigate(['/unauthorized']);
  return false;
  return true;
};
