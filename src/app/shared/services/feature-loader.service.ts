import { inject, Injectable } from '@angular/core';
import { GlobalStore } from '@state/global.state';

@Injectable({
  providedIn: 'root',
})
export class FeatureLoaderService {
  private _globalStore = inject(GlobalStore);

  show(): void {
    this._globalStore.setFeatureLoading(true);
  }

  hide(): void {
    this._globalStore.setFeatureLoading(false);
  }
}
