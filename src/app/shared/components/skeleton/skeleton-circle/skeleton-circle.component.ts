import { Component } from '@angular/core';

@Component({
  selector: 'fac-skeleton-circle',
  exportAs: 'facSkeletonCircle',
  template: '',
  styleUrls: ['./skeleton-circle.component.scss'],
  host: {
    class: 'fac-skeleton-item fac-skeleton-circle',
  },
  standalone: true,
})
export class SkeletonCircleComponent {}
