import { booleanAttribute, Component, Input } from '@angular/core';
import { LAYOUT } from '../types';

@Component({
  selector: 'app-layout',
  exportAs: 'appLayout',
  standalone: true,
  template: `
    <ng-content select="app-layout-header"></ng-content>
    <div class="flex grow overflow-hidden">
      <ng-content select="app-layout-sidebar"></ng-content>
      <div class="grow flex flex-col relative overflow-hidden">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &.is-window-mode {
        width: 100dvw;
        height: 100dvh;
      }
    }
  `,
  providers: [
    {
      provide: LAYOUT,
      useExisting: LayoutComponent,
    },
  ],
  host: {
    class: 'app-layout',
    '[class.is-window-mode]': 'windowMode',
  },
})
export class LayoutComponent {
  @Input() public layoutId: string;

  @Input({ transform: booleanAttribute }) public windowMode = false;
}
