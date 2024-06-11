import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facTimelineItemIndicator]',
  exportAs: 'facTimelineItemIndicator'
})
export class TimelineItemIndicatorDirective {
  readonly templateRef = inject(TemplateRef);
}
