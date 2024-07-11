import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[facNavigationGroupToggleIcon]',
  exportAs: 'appNavigationGroupToggleIcon',
  host: {
    class: 'app-navigation-group-toggle-icon',
  },
  standalone: true,
})
export class NavigationGroupToggleIconDirective {
  public readonly templateRef = inject(TemplateRef, { optional: true });
}
