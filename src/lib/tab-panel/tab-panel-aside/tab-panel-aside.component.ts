import { Component } from '@angular/core';
import { TAB_PANEL_ASIDE } from '../types';

@Component({
  selector: 'fac-tab-panel-aside',
  exportAs: 'facTabPanelAside',
  templateUrl: './tab-panel-aside.component.html',
  styleUrls: ['./tab-panel-aside.component.scss'],
  providers: [
    {
      provide: TAB_PANEL_ASIDE,
      useExisting: TabPanelAsideComponent
    }
  ],
  host: {
    'class': 'fac-tab-panel-aside'
  }
})
export class TabPanelAsideComponent {
  nextId = 0;
}
