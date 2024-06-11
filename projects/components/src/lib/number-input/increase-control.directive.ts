import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facIncreaseControl]',
  exportAs: 'facIncreaseControl'
})
export class IncreaseControlDirective {
  readonly templateRef = inject(TemplateRef);
}
