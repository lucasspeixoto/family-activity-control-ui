import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { HDividerComponent } from '@shared/components/divider';
import { createSigninForm, Signin } from '@auth/constants/forms';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs';
import { AuthenticationService } from '@authS/authentication.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatIcon,
    MatIconButton,
    MatSuffix,
    HDividerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styles: ``,
})
export class SigninComponent {
  public signinForm = createSigninForm();

  public authenticationService = inject(AuthenticationService);

  private _destroy$ = inject(DestroyRef);

  private _snackBarService = inject(SnackbarService);

  private _router = inject(Router);

  public signinUserHandler(): void {
    this.authenticationService.startLoading();

    const signinUserData = this.signinForm.value as Signin;

    this.authenticationService
      .signinUserHandler(signinUserData)
      .pipe(
        delay(2000),
        finalize(() => this.authenticationService.stopLoading()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        next: response =>
          this.authenticationService.authenticatedSuccessHandler(response),
        complete: () => {
          this.signinForm.reset();
          this._router.navigateByUrl('/home/bill/list');
        },
        error: error => {
          const errorMessage = `Error: Something went wrong, try again later (${error.error.message})`;

          this._snackBarService.showRightTopMessage(`${errorMessage}`);
        },
      }),
      finalize(() => this.authenticationService.stopLoading());
  }
}
