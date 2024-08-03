import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'features',
    loadComponent: () =>
      import('./view/presentation-cards.component').then(
        c => c.PresentationCardsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentationRoutingModule {}
