import { Directive } from '@angular/core';

@Directive({
  selector: '[facScrollSpyContainer]',
  exportAs: 'facScrollSpyContainer',
  host: {
    'class': 'fac-scroll-spy-container'
  }
})
export class ScrollSpyContainerDirective {
}
