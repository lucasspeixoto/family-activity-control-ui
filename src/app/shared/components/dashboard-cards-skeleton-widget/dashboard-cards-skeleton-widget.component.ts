import { Component, input, numberAttribute } from '@angular/core';
import {
  SkeletonLineComponent,
  SkeletonBlockComponent,
  SkeletonComponent,
} from '../skeleton';

@Component({
  selector: 'app-dashboard-cards-skeleton-widget',
  standalone: true,
  imports: [SkeletonComponent, SkeletonLineComponent, SkeletonBlockComponent],
  templateUrl: './dashboard-cards-skeleton-widget.component.html',
  styleUrl: './dashboard-cards-skeleton-widget.component.scss',
})
export class DashboardCardsSkeletonWidgetComponent {
  count = input(2, {
    transform: numberAttribute,
  });
}
