import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HDividerComponent } from '@shared/components/divider';
import { createSignupForm, Signup } from '@auth/constants/forms';
import { AuthenticationService } from '@authS/authentication.service';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatSuffix,
    RouterLink,
    ReactiveFormsModule,
    HDividerComponent,
  ],
  templateUrl: './signup.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  public signupForm = createSignupForm();

  public authenticationService = inject(AuthenticationService);

  private _destroy$ = inject(DestroyRef);

  private _snackBarService = inject(SnackbarService);

  private _router = inject(Router);

  public signupUserHandler(): void {
    this.authenticationService.startLoading();

    const signupUserData = this.signupForm.value as Signup;

    this.authenticationService
      .signupUserHandler(signupUserData)
      .pipe(
        finalize(() => this.authenticationService.stopLoading()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        next: response => {
          this._snackBarService.showRightTopMessage(
            `${response.message}. Insert credentials to sign in`
          );
        },
        complete: () => {
          this.signupForm.reset();

          this._router.navigateByUrl('/auth/signin');
        },
        error: error => {
          const errorMessage = `Error: Something went wrong, try again later (${error.error.message})`;

          this._snackBarService.showRightTopMessage(`${errorMessage}`);
        },
      }),
      finalize(() => this.authenticationService.stopLoading());
  }
}
