import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { HDividerComponent } from '@shared/components/divider';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatIconButton,
    MatSuffix,
    HDividerComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  private router = inject(Router);

  public loginHandler(): void {
    this.router.navigateByUrl('/pages/bill/bills/list');
  }
}
