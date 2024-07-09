import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./view/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./view/resources/resources.component').then(
        c => c.ResourcesComponent
      ),
  },
  {
    path: 'notification-management',
    loadComponent: () =>
      import(
        './view/notification-management/notification-management.component'
      ).then(c => c.NotificationManagementComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
