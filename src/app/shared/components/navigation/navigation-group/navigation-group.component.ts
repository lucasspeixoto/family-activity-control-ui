import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-group',
  exportAs: 'appNavigationGroup',
  templateUrl: './navigation-group.component.html',
  styleUrls: ['./navigation-group.component.scss'],
  host: {
    class: 'app-navigation-group',
  },
  standalone: true,
})
export class NavigationGroupComponent {}
