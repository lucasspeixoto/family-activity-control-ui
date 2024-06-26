import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNavigationItemIcon]',
  exportAs: 'facNavigationItemIcon',
  host: {
    class: 'fac-navigation-item-icon',
  },
  standalone: true,
})
export class NavigationItemIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
