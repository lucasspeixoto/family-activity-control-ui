import { Component } from '@angular/core';
import {
  SkeletonLineComponent,
  SkeletonBlockComponent,
  SkeletonComponent,
} from '../skeleton';

@Component({
  selector: 'app-dashboard-chart-skeleton-widget',
  standalone: true,
  imports: [SkeletonComponent, SkeletonLineComponent, SkeletonBlockComponent],
  templateUrl: './dashboard-chart-skeleton-widget.component.html',
  styleUrl: './dashboard-chart-skeleton-widget.component.scss',
})
export class DashboardChartSkeletonWidgetComponent {}
