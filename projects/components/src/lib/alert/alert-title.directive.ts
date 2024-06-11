import { Directive } from '@angular/core';

@Directive({
  selector: 'fac-alert-title,[facAlertTitle]',
  exportAs: 'facAlertTitle',
  host: {
    'class': 'fac-alert-title'
  }
})
export class AlertTitleDirective {
}
