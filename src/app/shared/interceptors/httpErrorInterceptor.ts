import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseError } from '@shared/models/response-error';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';

      const serverError = error.error as ResponseError;

      errorMsg = `Error: ${serverError.message}`;

      snackBar.open(errorMsg, 'Close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return throwError(() => errorMsg);
    })
  );
};
