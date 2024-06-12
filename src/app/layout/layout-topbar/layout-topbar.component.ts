import { Component } from '@angular/core';

@Component({
  selector: 'fac-layout-topbar',
  exportAs: 'fac-layout-topbar',
  standalone: true,
  imports: [],
  templateUrl: './layout-topbar.component.html',
  styleUrl: './layout-topbar.component.scss',
  host: {
    'class': 'fac-layout-topbar'
  }
})
export class LayoutTopbarComponent {

}
