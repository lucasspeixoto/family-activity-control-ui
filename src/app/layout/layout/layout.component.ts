import { booleanAttribute, Component, Input } from '@angular/core';
import { LAYOUT } from '../types';

@Component({
  selector: 'fac-layout',
  exportAs: 'facLayout',
  standalone: true,
  template: `
    <ng-content select="fac-layout-header"></ng-content>
    <div class="flex grow overflow-hidden">
      <ng-content select="fac-layout-sidebar"></ng-content>
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
    class: 'fac-layout',
    '[class.is-window-mode]': 'windowMode',
  },
})
export class LayoutComponent {
  @Input() public layoutId: string;

  @Input({ transform: booleanAttribute }) public windowMode = false;
}
