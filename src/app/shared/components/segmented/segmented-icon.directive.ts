import { Directive } from '@angular/core';

@Directive({
  selector: '[facSegmentedIcon]',
  exportAs: 'appSegmentedIcon',
  host: {
    class: 'app-segmented-icon',
  },
  standalone: true,
})
export class SegmentedIconDirective {}
