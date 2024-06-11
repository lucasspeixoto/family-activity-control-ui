import { Component, HostListener, inject, Input } from '@angular/core';
import { TabPanelApiService } from '../tab-panel-api.service';
import { TabPanelNavComponent } from '../tab-panel-nav/tab-panel-nav.component';
import { TAB_PANEL_NAV } from '../types';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'fac-tab-panel-item',
  exportAs: 'facTabPanelItem',
  templateUrl: './tab-panel-item.component.html',
  styleUrls: ['tab-panel-item.component.scss'],
  hostDirectives: [
    MatRipple
  ],
  host: {
    'class': 'fac-tab-panel-item',
    '[class.is-active]': 'api.isActive(this.for)',
  }
})
export class TabPanelItemComponent {
  readonly api = inject(TabPanelApiService);
  private _nav = inject<TabPanelNavComponent>(TAB_PANEL_NAV, { optional: true });

  @Input()
  for: any = this._nav ? this._nav.nextId++ : null;

  @HostListener('click')
  private _handleClick() {
    if (!this.for) {
      return;
    }

    this.api.activate(this.for);
  }
}
