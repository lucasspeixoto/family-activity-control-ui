import { Directive } from '@angular/core';

@Directive({
  selector: '[facIncidentIcon]',
  exportAs: 'facIncidentIcon',
  host: {
    'class': 'fac-incident-icon'
  }
})
export class IncidentIconDirective {
}
