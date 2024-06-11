import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facDecreaseControl]',
  exportAs: 'facDecreaseControl'
})
export class DecreaseControlDirective {
  readonly templateRef = inject(TemplateRef);
}
