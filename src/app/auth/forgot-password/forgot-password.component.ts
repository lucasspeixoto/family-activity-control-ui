import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    RouterLink,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './forgot-password.component.html',
  styles: ``,
})
export class ForgotPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  resetPassword() {}
}
