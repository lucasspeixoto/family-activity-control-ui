import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-block',
  exportAs: 'appSkeletonBlock',
  template: '',
  styleUrls: ['./skeleton-block.component.scss'],
  host: {
    class: 'app-skeleton-item app-skeleton-block',
  },
  standalone: true,
})
export class SkeletonBlockComponent {}
