import {
  Component
} from '@angular/core';

@Component({
  selector: 'fac-navigation-group',
  exportAs: 'facNavigationGroup',
  templateUrl: './navigation-group.component.html',
  styleUrls: ['./navigation-group.component.scss'],
  host: {
    class: 'fac-navigation-group'
  }
})
export class NavigationGroupComponent {
}
