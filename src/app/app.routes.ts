import { Routes } from '@angular/router';
import { authenticationGuard } from './auth/guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [authenticationGuard('auth/signin')],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  },
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./error/not-found/not-found.component').then(
        c => c.NotFoundComponent
      ),
  },
];
