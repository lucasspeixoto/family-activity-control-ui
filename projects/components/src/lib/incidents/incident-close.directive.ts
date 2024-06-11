import { Directive } from '@angular/core';

@Directive({
  selector: '[facIncidentClose]',
  exportAs: 'facIncidentClose',
  host: {
    'class': 'fac-incident-close'
  }
})
export class IncidentCloseDirective {
}
