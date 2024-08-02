import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, first, tap, throwError } from 'rxjs';

export function authenticationGuard(redirectRoute: string): CanActivateFn {
  return () => {
    const authService = inject(AuthenticationService);

    const router = inject(Router);

    return authService.isUserAuthenticatedHandler().pipe(
      first(),
      tap(response => {
        if (typeof sessionStorage !== 'undefined') {
          const accessToken = sessionStorage.getItem('FAC:access_token');
          const refreshToken = sessionStorage.getItem('FAC:refresh_token');

          if (!accessToken || !refreshToken) {
            return false;
          }
        }

        return response || router.createUrlTree([redirectRoute]);
      }),
      catchError((error: unknown) => {
        authService.removeAuthenticationTokens();

        return throwError(() => error);
      })
    );
  };
}
