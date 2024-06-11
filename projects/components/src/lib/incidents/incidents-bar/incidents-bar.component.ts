import { Component, HostListener, inject } from '@angular/core';
import { INCIDENTS } from '../properties';
import { IncidentsComponent } from '../incidents/incidents.component';

@Component({
  selector: 'fac-incidents-bar',
  exportAs: 'facIncidentsBar',
  templateUrl: './incidents-bar.component.html',
  styleUrls: ['./incidents-bar.component.scss'],
  host: {
    'class': 'fac-incidents-bar'
  }
})
export class IncidentsBarComponent {
  private _parent = inject<IncidentsComponent>(INCIDENTS, { optional: true });

  @HostListener('click', ['$event'])
  private _handleClick() {
    this._parent?.toggleVisibility();
  }
}
