import { Directive } from '@angular/core';
import { MatRipple } from "@angular/material/core";

@Directive({
  selector: '[facAlertAction]',
  exportAs: 'facAlertAction',
  host: {
    'class': 'fac-alert-action'
  },
  hostDirectives: [MatRipple]
})
export class AlertActionDirective {
}
