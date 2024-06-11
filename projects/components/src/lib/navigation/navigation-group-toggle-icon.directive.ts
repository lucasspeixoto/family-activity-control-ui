import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNavigationGroupToggleIcon]',
  exportAs: 'facNavigationGroupToggleIcon',
  host: {
    'class': 'fac-navigation-group-toggle-icon'
  }
})
export class NavigationGroupToggleIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
