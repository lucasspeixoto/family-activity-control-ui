import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNumberInputPrefix]',
  exportAs: 'facNumberInputPrefix'
})
export class NumberInputPrefixDirective {
  readonly templateRef = inject(TemplateRef);
}
