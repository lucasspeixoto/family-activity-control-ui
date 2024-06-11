import { Component } from '@angular/core';

@Component({
  selector: 'fac-tab-panel-header',
  exportAs: 'facTabPanelHeader',
  templateUrl: './tab-panel-header.component.html',
  styleUrls: ['./tab-panel-header.component.scss'],
  host: {
    'class': 'fac-tab-panel-header'
  }
})
export class TabPanelHeaderComponent {
}
