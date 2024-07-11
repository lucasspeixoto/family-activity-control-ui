import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNavigationItemIcon]',
  exportAs: 'appNavigationItemIcon',
  host: {
    class: 'app-navigation-item-icon',
  },
  standalone: true,
})
export class NavigationItemIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
