import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facFilterBuilderOperationIcon]'
})
export class FilterBuilderOperationIconDirective {
  readonly templateRef = inject(TemplateRef);
}
