import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./bill/view/common/common.component').then(
        c => c.CommonComponent
      ),
    children: [
      {
        path: 'bill',
        loadChildren: () =>
          import('./bill/bill.module').then(m => m.BillModule),
      },
      {
        path: 'travel-planner',
        loadChildren: () =>
          import('./travel-planner/travel-planner.module').then(
            m => m.TravelPlannerModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
