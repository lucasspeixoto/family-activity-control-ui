import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-line',
  exportAs: 'appSkeletonLine',
  template: '',
  styleUrls: ['./skeleton-line.component.scss'],
  host: {
    class: 'app-skeleton-item app-skeleton-line',
  },
  standalone: true,
})
export class SkeletonLineComponent {}
