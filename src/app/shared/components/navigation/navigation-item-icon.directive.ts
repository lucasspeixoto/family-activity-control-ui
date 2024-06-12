import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNavigationItemIcon]',
  exportAs: 'facNavigationItemIcon',
  host: {
    'class': 'fac-navigation-item-icon'
  }
})
export class NavigationItemIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
