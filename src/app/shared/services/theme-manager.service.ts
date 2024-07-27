import { afterNextRender, inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const LOCAL_STORAGE_KEY = 'FAC:Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private _document = inject(DOCUMENT);
  private _isDarkSub = new BehaviorSubject(false);
  private _window = this._document.defaultView;
  private _isDark$ = this._isDarkSub.asObservable();

  constructor() {
    afterNextRender(() => {
      if (this._window !== null && this._window.matchMedia) {
        this._window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', () => {
            const storedColorScheme = this._getStoredColorScheme();

            if (storedColorScheme !== 'light' && storedColorScheme !== 'dark') {
              this.setColorScheme(this.getPreferredColorScheme());
            }
          });
      }
    });
  }

  public toggleColorScheme() {
    if (this._isDarkSub.value) {
      this.changeColorScheme('light');
    } else {
      this.changeColorScheme('dark');
    }
  }

  public changeColorScheme(colorScheme: string): void {
    this._setStoredColorScheme(colorScheme);
    this.setColorScheme(colorScheme);
  }

  public isDark(): Observable<boolean> {
    return this._isDark$;
  }

  private _getStoredColorScheme = () => {
    if (typeof localStorage === 'undefined') {
      return;
    }

    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
      .colorScheme;
  };

  private _setStoredColorScheme = (colorScheme: string): void => {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const meta = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
    meta.colorScheme = colorScheme;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meta));
  };

  public getPreferredColorScheme = (): 'dark' | 'light' => {
    const storedTheme = this._getStoredColorScheme();

    if (storedTheme) {
      return storedTheme;
    }

    if (this._window !== null && this._window.matchMedia) {
      return this._window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return 'light';
  };

  public setColorScheme = (colorScheme: string): void => {
    if (this._window !== null && this._window.matchMedia) {
      if (
        colorScheme === 'auto' &&
        this._window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this._isDarkSub.next(true);
        this._document.documentElement.classList.add('dark');
      } else {
        const isDark = colorScheme === 'dark';
        this._isDarkSub.next(colorScheme === 'dark');

        if (isDark) {
          this._document.documentElement.classList.add('dark');
        } else {
          this._document.documentElement.classList.remove('dark');
        }
      }
    }
  };
}
