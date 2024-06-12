import { Component } from '@angular/core';

@Component({
  selector: 'fac-gauge-value',
  exportAs: 'facGaugeValue',
  templateUrl: './gauge-value.component.html',
  styleUrls: ['./gauge-value.component.scss'],
  host: {
    'class': 'fac-gauge-value'
  }
})
export class GaugeValueComponent {
}
