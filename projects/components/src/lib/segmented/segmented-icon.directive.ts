import { Directive } from '@angular/core';

@Directive({
  selector: '[facSegmentedIcon]',
  exportAs: 'facSegmentedIcon',
  host: {
    'class': 'fac-segmented-icon'
  }
})
export class SegmentedIconDirective {
}
