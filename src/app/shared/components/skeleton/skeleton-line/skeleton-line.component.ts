import { Component } from '@angular/core';

@Component({
  selector: 'fac-skeleton-line',
  exportAs: 'facSkeletonLine',
  template: '',
  styleUrls: ['./skeleton-line.component.scss'],
  host: {
    class: 'fac-skeleton-item fac-skeleton-line',
  },
  standalone: true,
})
export class SkeletonLineComponent {}
