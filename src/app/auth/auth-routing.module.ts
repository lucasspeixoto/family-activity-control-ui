import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then(c => c.SigninComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then(c => c.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        c => c.ForgotPasswordComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
