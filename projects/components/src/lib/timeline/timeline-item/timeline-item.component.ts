import { Component, ContentChild } from '@angular/core';
import { TimelineItemIndicatorDirective } from '../timeline-item-indicator.directive';

@Component({
  selector: 'fac-timeline-item',
  exportAs: 'facTimelineItem',
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss',
  host: {
    'class': 'fac-timeline-item'
  }
})
export class TimelineItemComponent {
  @ContentChild(TimelineItemIndicatorDirective)
  readonly indicatorRef: TimelineItemIndicatorDirective;
}
