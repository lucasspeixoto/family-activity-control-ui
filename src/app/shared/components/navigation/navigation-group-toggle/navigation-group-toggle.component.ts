import {
  Component,
  ContentChild,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { NavigationApiService } from '../navigation-api.service';
import { NavigationGroupToggleIconDirective } from '../navigation-group-toggle-icon.directive';
import { MatRipple } from '@angular/material/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-navigation-group-toggle',
  exportAs: 'appNavigationGroupToggle',
  templateUrl: './navigation-group-toggle.component.html',
  styleUrls: ['./navigation-group-toggle.component.scss'],
  hostDirectives: [MatRipple],
  host: {
    class: 'app-navigation-group-toggle',
    '[class.is-active]': 'active',
  },
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
})
export class NavigationGroupToggleComponent {
  readonly api = inject(NavigationApiService);

  @ContentChild(NavigationGroupToggleIconDirective)
  readonly iconRef!: NavigationGroupToggleIconDirective;

  @Input() public for!: string | number;

  get active(): boolean {
    return this.api.isGroupActive(this.for);
  }

  @HostListener('click', ['$event'])
  toggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.api.toggleGroup(this.for);
  }
}
