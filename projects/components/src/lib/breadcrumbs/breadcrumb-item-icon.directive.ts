import { Directive } from '@angular/core';

@Directive({
  selector: '[facBreadcrumbItemIcon]',
  exportAs: 'facBreadcrumbItemIcon',
  standalone: true,
  host: {
    'class': 'fac-breadcrumb-item-icon'
  }
})
export class BreadcrumbItemIconDirective {
}
