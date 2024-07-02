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

import { ThemeManagerService } from '@shared/services/theme-manager.service';
import { ScreenLoaderService } from '@shared/services/screen-loader.service';
import { PageLoadingBarComponent } from '@shared/components/page-loading-bar';
import { ScreenLoaderComponent } from './layout/components/screen-loader/screen-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScreenLoaderComponent, PageLoadingBarComponent],
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

  public loadingText = signal('Carregando...');
  public pageLoaded = signal(false);

  constructor() {
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
          }, 2000);
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
      }, 1000);
    }
  }
}
