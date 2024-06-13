import { Component } from '@angular/core';
import {
  SkeletonComponent,
  SkeletonLineComponent,
  SkeletonBlockComponent,
} from '../skeleton';

@Component({
  selector: 'app-dashboard-skeleton-widget',
  standalone: true,
  imports: [SkeletonComponent, SkeletonLineComponent, SkeletonBlockComponent],
  templateUrl: './dashboard-skeleton-widget.component.html',
  styleUrl: './dashboard-skeleton-widget.component.scss',
})
export class DashboardSkeletonWidgetComponent {}
