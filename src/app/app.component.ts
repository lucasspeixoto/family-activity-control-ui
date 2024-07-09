import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

import { ThemeManagerService } from '@sharedS/theme-manager.service';
import { ScreenLoaderService } from '@sharedS/screen-loader.service';
import { PageLoadingBarComponent } from '@sharedC/page-loading-bar';
import { ScreenLoaderComponent } from './layout/components/screen-loader/screen-loader.component';
import { LayoutApiService } from './layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScreenLoaderComponent,
    PageLoadingBarComponent,
    MatSnackBarModule,
  ],
  template: `
    @if (pageLoaded()) {
      <app-page-loading-bar fixed></app-page-loading-bar>
    }
    <app-screen-loader [loadingText]="loadingText()"></app-screen-loader>
    <router-outlet />
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  private _themeManager = inject(ThemeManagerService);
  private _screenLoader = inject(ScreenLoaderService);
  private _platformId = inject(PLATFORM_ID);
  private _router = inject(Router);
  private _layoutService = inject(LayoutApiService);

  public loadingText = signal('Loading...');
  public pageLoaded = signal(false);

  constructor(private _layoutBreakpointObserver$: BreakpointObserver) {
    afterNextRender(() => {
      // Scroll a page to top if url changed
      this._router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({
            top: 0,
            left: 0,
          });
          setTimeout(() => {
            this._screenLoader.hide();
            this.pageLoaded.set(true);

            this._layoutBreakpointObserver$
              ?.observe(['(max-width: 991px)'])
              .subscribe(result => {
                if (result.matches) {
                  this._layoutService.hideSidebar('root');
                }
              });
          }, 500);
        });
    });
  }

  public ngOnInit(): void {
    this._themeManager.setColorScheme(
      this._themeManager.getPreferredColorScheme()
    );

    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        this.loadingText.set('Starting...');
      }, 1000);
    }
  }
}
