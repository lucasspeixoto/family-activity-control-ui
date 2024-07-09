import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'travels',
    loadComponent: () =>
      import('./view/travels/travels.component').then(c => c.TravelsComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelPlannerRoutingModule {}
