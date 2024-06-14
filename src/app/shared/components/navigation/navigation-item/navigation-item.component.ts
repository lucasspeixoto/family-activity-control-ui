import {
  booleanAttribute,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { NavigationApiService } from '../navigation-api.service';
import { NavigationItemIconDirective } from '../navigation-item-icon.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'fac-navigation-item,[fac-navigation-item]',
  exportAs: 'facNavigationItem',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  host: {
    class: 'fac-navigation-item',
    '[class.is-active]': 'forceActive || active',
  },
  standalone: true,
  imports: [MatRipple, NgIf, NgTemplateOutlet],
})
export class NavigationItemComponent {
  private _api = inject(NavigationApiService);
  private _elementRef = inject(ElementRef);

  @ContentChild(NavigationItemIconDirective)
  iconRef!: NavigationItemIconDirective;

  get api() {
    return {
      isActive: () => this.active,
    };
  }

  @Input()
  key: any = Math.random();

  @Input({ transform: booleanAttribute })
  forceActive = false;

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (!this.key) {
      return;
    }

    this._api.activateItem(this.key);
  }

  get active(): boolean {
    return this._api.isItemActive(this.key);
  }

  get _hostElement(): ElementRef {
    return this._elementRef;
  }
}
