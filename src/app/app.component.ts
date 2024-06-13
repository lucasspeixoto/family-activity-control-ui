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

import { environment } from '../environments/environment';
import { ThemeManagerService } from '@shared/services/theme-manager.service';
import { AnalyticsService } from '@shared/services/analytics.service';
import { InactivityTrackerService } from '@shared/services/inactivity-tracker.service';
import { ScreenLoaderService } from '@shared/services/screen-loader.service';
import { SeoService } from '@shared/services/seo.service';
import { PageLoadingBarComponent } from '@shared/components/page-loading-bar';
import { ScreenLoaderComponent } from './layout/components/screen-loader/screen-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScreenLoaderComponent, PageLoadingBarComponent],
  template: `
    @if (pageLoaded()) {
    <fac-page-loading-bar fixed></fac-page-loading-bar>
    }
    <app-screen-loader [loadingText]="loadingText()"></app-screen-loader>
    <router-outlet />
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  private _themeManager = inject(ThemeManagerService);
  private _screenLoader = inject(ScreenLoaderService);
  private _analyticsService = inject(AnalyticsService);
  private _inactivityTracker = inject(InactivityTrackerService);
  private _seoService = inject(SeoService);
  private _platformId = inject(PLATFORM_ID);
  private _router = inject(Router);

  public loadingText = signal('Carregando...');
  public pageLoaded = signal(false);

  constructor() {
    afterNextRender(() => {
      // Scroll a page to top if url changed
      this._router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({
            top: 0,
            left: 0,
          });
          setTimeout(() => {
            this._screenLoader.hide();
            this.pageLoaded.set(true);
          }, 2000);
        });

      this._analyticsService.trackPageViews();

      this._inactivityTracker.setupInactivityTimer().subscribe(() => {
        console.log('Inactive mode has been activated!');
        // this._inactivityTracker.reset();
      });
    });
  }

  public ngOnInit(): void {
    this._themeManager.setColorScheme(
      this._themeManager.getPreferredColorScheme()
    );

    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        this.loadingText.set('Iniciando...');
      }, 1500);
    }

    this._seoService.trackCanonicalChanges(environment.siteUrl);
  }
}
