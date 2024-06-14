import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./common/common.component').then(c => c.CommonComponent),
    children: [
      {
        path: 'content',
        loadChildren: () =>
          import('./content/content.module').then(m => m.ContentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
