import { Component } from '@angular/core';

@Component({
  selector: 'fac-navigation-heading',
  exportAs: 'facNavigationHeading',
  templateUrl: './navigation-heading.component.html',
  styleUrls: ['./navigation-heading.component.scss'],
  host: {
    class: 'fac-navigation-heading',
  },
  standalone: true,
})
export class NavigationHeadingComponent {}
