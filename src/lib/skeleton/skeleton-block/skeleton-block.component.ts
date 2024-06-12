import { Component } from '@angular/core';

@Component({
  selector: 'fac-skeleton-block',
  exportAs: 'facSkeletonBlock',
  template: '',
  styleUrls: ['./skeleton-block.component.scss'],
  host: {
    'class': 'fac-skeleton-item fac-skeleton-block'
  }
})
export class SkeletonBlockComponent {
}
