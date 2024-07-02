import {
  booleanAttribute,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { LayoutApiService } from '../layout-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LAYOUT, LayoutSidebarVisibilityChange } from '../types';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: block;
      z-index: 1;

      &.is-hidden {
        display: none;
      }
    }
  `,
  host: {
    class: 'app-layout-sidebar',
    '[class.is-hidden]': 'hidden',
  },
})
export class LayoutSidebarComponent implements OnInit {
  @Input({ transform: booleanAttribute }) public hidden = false;

  private _parent = inject<LayoutComponent>(LAYOUT);
  private _destroyRef = inject(DestroyRef);
  private _layoutApi = inject(LayoutApiService);

  public ngOnInit() {
    this._layoutApi.sidebarVisibility
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((event: LayoutSidebarVisibilityChange) => {
        if (event.layoutId !== this._parent.layoutId) {
          return;
        }

        this.hidden = event.hidden;
      });
  }
}
