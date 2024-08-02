import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SigninResponse } from '@auth/models/signin';
import { AuthenticationService } from '@authS/authentication.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, switchMap, throwError } from 'rxjs';
import { DecodedToken } from '../models/decoded-token';

export const authorizationInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const snackBar = inject(MatSnackBar);

  const authenticationService = inject(AuthenticationService);

  const router = inject(Router);

  let accessToken = null;
  let username = null;

  if (typeof sessionStorage !== 'undefined') {
    accessToken = sessionStorage.getItem('FAC:access_token') as string;
  }

  if (accessToken) {
    if (!request.url.includes('auth/refresh')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    username = decodedToken.sub;
  } else {
    router.navigateByUrl('/');
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        !(
          (
            request.url.includes('auth/login') ||
            request.url.includes('auth/refresh') ||
            request.url.includes('auth/is-authenticated')
          ) // <- this will avoid an infinite loop when the accessToken expires.
        ) &&
        error.status === 401
      ) {
        let refreshToken = null;

        if (typeof sessionStorage !== 'undefined') {
          refreshToken = sessionStorage.getItem('FAC:refresh_token') as string;
        }

        if (refreshToken) {
          return authenticationService.refreshTokenHandler(username!).pipe(
            switchMap((data: SigninResponse) => {
              request = request.clone({
                setHeaders: { Authorization: `Bearer ${data.accessToken}` },
              });

              return next(request);
            }),
            catchError((_error: unknown) => {
              return throwError(() => {
                authenticationService.removeAuthenticationTokens();
                router.navigateByUrl('/');
                snackBar.open('Token is expired, Please Login again', 'Close', {
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                });
              });
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
