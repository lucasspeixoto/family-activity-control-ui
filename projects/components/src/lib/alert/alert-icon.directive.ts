import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facAlertIcon]',
  exportAs: 'facAlertIcon',
  host: {
    'class': 'fac-alert-icon'
  }
})
export class AlertIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
