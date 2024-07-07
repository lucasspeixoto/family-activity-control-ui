import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bills/list',
    loadComponent: () =>
      import('./view/bill-list/bill-list.component').then(
        c => c.BillListComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {}
