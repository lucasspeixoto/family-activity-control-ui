import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'base-layouts',
    loadChildren: () => import('./base-layouts/base-layouts.module').then(m => m.BaseLayoutsModule)
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./error/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
