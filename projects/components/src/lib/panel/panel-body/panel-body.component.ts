import { Component } from '@angular/core';

@Component({
  selector: 'fac-panel-body',
  exportAs: 'facPanelBody',
  templateUrl: './panel-body.component.html',
  styleUrls: ['./panel-body.component.scss'],
  host: {
    'class': 'fac-panel-body'
  }
})
export class PanelBodyComponent {
}
