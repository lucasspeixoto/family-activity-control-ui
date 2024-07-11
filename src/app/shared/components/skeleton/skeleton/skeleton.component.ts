import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  exportAs: 'appSkeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  host: {
    class: 'app-skeleton',
    '[class.is-direction-row]': 'direction() === "row"',
    '[class.is-direction-col]': 'direction() === "col"',
  },
  standalone: true,
})
export class SkeletonComponent {
  direction = input<'row' | 'col'>('row');
}
