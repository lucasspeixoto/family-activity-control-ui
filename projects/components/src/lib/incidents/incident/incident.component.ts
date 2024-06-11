import { Component } from '@angular/core';

@Component({
  selector: 'fac-incident,[fac-incident]',
  exportAs: 'facIncident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss'],
  host: {
    'class': 'fac-incident'
  }
})
export class IncidentComponent {
}
