import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        // client side error
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        // server side error
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }

      snackBar.open(errorMsg, 'Close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return throwError(() => errorMsg);
    })
  );
};
