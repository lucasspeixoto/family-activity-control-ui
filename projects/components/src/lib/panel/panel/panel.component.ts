import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'fac-panel',
  exportAs: 'facPanel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  host: {
    'class': 'fac-panel',
    '[class.is-absolute]': 'absolute'
  }
})
export class PanelComponent {
  @Input({ transform: booleanAttribute })
  absolute = false
}
