import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@authS/authentication.service';

export function userRoleGuard(redirectRoute: string): CanActivateFn {
  return () => {
    const authService = inject(AuthenticationService);

    const router = inject(Router);

    return authService.isUserAdmin() || router.createUrlTree([redirectRoute]);
  };
}
