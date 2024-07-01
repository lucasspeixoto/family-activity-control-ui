import {
  booleanAttribute,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'fac-layout-body',
  exportAs: 'facLayoutBody',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;

      &:has(:not(.fac-layout-body)) {
        overflow: auto;
      }
    }
  `,
  host: {
    class: 'fac-layout-body fac-scroll-lg',
  },
})
export class LayoutBodyComponent implements OnInit {
  private _router = inject(Router);
  private _elementRef = inject(ElementRef);
  private _platformId = inject(PLATFORM_ID);

  @Input({ transform: booleanAttribute })
  autoscrollToTop = true;

  public ngOnInit() {
    // Scroll a page to top if url changed
    this._router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        if (!this.autoscrollToTop) {
          return;
        }

        if (isPlatformServer(this._platformId)) {
          return;
        }

        this._elementRef.nativeElement.scrollTo({
          top: 0,
          left: 0,
        });
      });
  }
}
