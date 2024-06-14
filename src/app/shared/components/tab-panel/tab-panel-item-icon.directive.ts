import { Directive } from '@angular/core';

@Directive({
  selector: '[facTabPanelItemIcon]',
  exportAs: 'facTabPanelItemIcon',
  host: {
    class: 'fac-tab-panel-item-icon',
  },
})
export class TabPanelItemIconDirective {}
