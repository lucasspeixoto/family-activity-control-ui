import { Component, input } from '@angular/core';

@Component({
  selector: 'fac-skeleton',
  exportAs: 'facSkeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  host: {
    class: 'fac-skeleton',
    '[class.is-direction-row]': 'direction() === "row"',
    '[class.is-direction-col]': 'direction() === "col"',
  },
  standalone: true,
})
export class SkeletonComponent {
  direction = input<'row' | 'col'>('row');
}
