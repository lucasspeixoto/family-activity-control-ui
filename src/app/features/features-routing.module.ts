import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userRoleGuard } from './guards/user-role.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./common/common.component').then(c => c.CommonComponent),
    children: [
      {
        path: 'bill',
        loadChildren: () =>
          import('./bill/bill.module').then(m => m.BillModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [userRoleGuard('home/bill/list')],
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            m => m.UserProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
