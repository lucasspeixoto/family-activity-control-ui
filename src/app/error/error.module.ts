import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* {
    path: 'internal-server-error',
    title: 'Internal Server Error',
    loadComponent: () => import('./internal-server-error/internal-server-error.component').then(c => c.InternalServerErrorComponent)
  },
  {
    path: 'access-denied',
    title: 'Access Denied',
    loadComponent: () => import('./access-denied/access-denied.component').then(c => c.AccessDeniedComponent)
  }, */
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorModule { }
