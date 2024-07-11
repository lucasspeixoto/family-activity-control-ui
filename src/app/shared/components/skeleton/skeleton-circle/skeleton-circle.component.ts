import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-circle',
  exportAs: 'appSkeletonCircle',
  template: '',
  styleUrls: ['./skeleton-circle.component.scss'],
  host: {
    class: 'app-skeleton-item app-skeleton-circle',
  },
  standalone: true,
})
export class SkeletonCircleComponent {}
