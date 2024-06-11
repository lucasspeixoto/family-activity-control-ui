import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNumberInputSuffix]',
  exportAs: 'facNumberInputSuffix'
})
export class NumberInputSuffixDirective {
  readonly templateRef = inject(TemplateRef);
}
