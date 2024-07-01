import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalState, GlobalStore } from '@state/global.state';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-screen-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div
      #loader
      class="fixed z-[9999] inset-0 bg-white dark:bg-neutral-700 flex items-center justify-center">
      <div class="flex items-center justify-center flex-col">
        <mat-spinner />
        @if (loadingText) {
          <div class="text-sm text-neutral-500 mt-3 dark:text-neutral-100">
            {{ loadingText }}
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenLoaderComponent {
  private _globalStore = inject(GlobalStore);

  @Input()
  src = 'assets/screen-loader.svg';

  @Input()
  srcDark = 'assets/screen-loader-dark.svg';

  @Input()
  loadingText: string;

  @ViewChild('loader', { static: true })
  private _loaderElement: ElementRef;

  constructor() {
    const initialState = getState<GlobalState>(this._globalStore);
    effect(() => {
      const currentState = getState<GlobalState>(this._globalStore);

      if (initialState.screenLoading === currentState.screenLoading) {
        return;
      }

      if (currentState.screenLoading) {
        this._show();
      } else {
        this._hide();
      }
    });
  }

  private _show(): void {
    const loaderEl = this._loaderElement.nativeElement as HTMLElement;
    loaderEl.style['visibility'] = 'visible';
    loaderEl.style['zIndex'] = '9999999';
  }

  private _hide(): void {
    const loaderEl = this._loaderElement.nativeElement as HTMLElement;
    loaderEl.style['visibility'] = 'hidden';
    loaderEl.style['zIndex'] = '-9999999';
  }
}
