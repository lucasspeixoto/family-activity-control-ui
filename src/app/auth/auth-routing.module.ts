import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
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
  {
    path: 'create-account',
    loadComponent: () =>
      import('./create-account/create-account.component').then(
        c => c.CreateAccountComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
