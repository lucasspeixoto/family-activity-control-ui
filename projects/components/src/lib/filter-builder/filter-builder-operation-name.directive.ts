import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facFilterBuilderOperationName]'
})
export class FilterBuilderOperationNameDirective {
  readonly templateRef = inject(TemplateRef);
}
