import { Component } from '@angular/core';

@Component({
  selector: 'fac-tab-panel-item-text',
  exportAs: 'facTabPanelItemText',
  templateUrl: './tab-panel-item-text.component.html',
  styleUrls: ['./tab-panel-item-text.component.scss'],
  host: {
    class: 'fac-tab-panel-item-text',
  },
})
export class TabPanelItemTextComponent {}
