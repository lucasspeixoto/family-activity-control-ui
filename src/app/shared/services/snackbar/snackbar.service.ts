import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar);

  public showRightTopMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
