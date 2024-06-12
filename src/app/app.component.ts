import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { ScreenLoaderComponent } from '@app/screen-loader/screen-loader.component';

import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

import { environment } from '../environments/environment';
import { ThemeManagerService } from '../lib/_services/theme-manager.service';
import { AnalyticsService } from '../lib/_services/analytics.service';
import { InactivityTrackerService } from '../lib/_services/inactivity-tracker.service';
import { ScreenLoaderService } from '../lib/_services/screen-loader.service';
import { SeoService } from '../lib/_services/seo.service';
import { PageLoadingBarComponent } from '../lib/page-loading-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScreenLoaderComponent, PageLoadingBarComponent],
  /* changeDetection: ChangeDetectionStrategy.OnPush, */
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

  loadingText = signal('Carregando...');
  pageLoaded = signal(false);

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
          }, 3000);
        });

      this._analyticsService.trackPageViews();

      this._inactivityTracker.setupInactivityTimer().subscribe(() => {
        console.log('Inactive mode has been activated!');
        // this._inactivityTracker.reset();
      });
    });
  }

  ngOnInit(): void {
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
