import { booleanAttribute, Component, Input } from '@angular/core';
import { LAYOUT } from '../types';

@Component({
  selector: 'fac-layout',
  exportAs: 'facLayout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
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
  @Input()
  layoutId: string;

  @Input({ transform: booleanAttribute })
  windowMode = false;
}
