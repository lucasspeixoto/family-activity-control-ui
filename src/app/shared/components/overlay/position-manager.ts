import { ConnectedPosition } from '@angular/cdk/overlay';
import { OverlayPosition } from './types';

export class PositionManager {
  private _positions: { [prop: string]: ConnectedPosition } = {
    'below-start': {
      originY: 'bottom',
      overlayY: 'top',
      originX: 'start',
      overlayX: 'start',
      panelClass: ['app-overlay-below', 'app-overlay-below-start'],
    },
    'below-center': {
      originY: 'bottom',
      overlayY: 'top',
      originX: 'center',
      overlayX: 'center',
      panelClass: ['app-overlay-below', 'app-overlay-below-center'],
    },
    'below-end': {
      originY: 'bottom',
      overlayY: 'top',
      originX: 'end',
      overlayX: 'end',
      panelClass: ['app-overlay-below', 'app-overlay-below-end'],
    },
    'above-start': {
      originY: 'top',
      overlayY: 'bottom',
      originX: 'start',
      overlayX: 'start',
      panelClass: ['app-overlay-above', 'app-overlay-above-start'],
    },
    'above-center': {
      originY: 'top',
      overlayY: 'bottom',
      originX: 'center',
      overlayX: 'center',
      panelClass: ['app-overlay-above', 'app-overlay-above-center'],
    },
    'above-end': {
      originY: 'top',
      overlayY: 'bottom',
      originX: 'end',
      overlayX: 'end',
      panelClass: ['app-overlay-above', 'app-overlay-above-end'],
    },
    'before-start': {
      originY: 'top',
      overlayY: 'top',
      originX: 'start',
      overlayX: 'end',
      panelClass: ['app-overlay-before', 'app-overlay-before-start'],
    },
    'before-center': {
      originY: 'center',
      overlayY: 'center',
      originX: 'start',
      overlayX: 'end',
      panelClass: ['app-overlay-before', 'app-overlay-before-center'],
    },
    'before-end': {
      originY: 'bottom',
      overlayY: 'bottom',
      originX: 'start',
      overlayX: 'end',
      panelClass: ['app-overlay-before', 'app-overlay-before-end'],
    },
    'after-end': {
      originY: 'bottom',
      overlayY: 'bottom',
      originX: 'end',
      overlayX: 'start',
      panelClass: ['app-overlay-after', 'app-overlay-after-end'],
    },
    'after-center': {
      originY: 'center',
      overlayY: 'center',
      originX: 'end',
      overlayX: 'start',
      panelClass: ['app-overlay-after', 'app-overlay-after-center'],
    },
    'after-start': {
      originY: 'top',
      overlayY: 'top',
      originX: 'end',
      overlayX: 'start',
      panelClass: ['app-overlay-after', 'app-overlay-after-start'],
    },
  };

  private _positionPairs: any = {
    'below-start': 'above-start',
    'below-center': 'above-center',
    'below-end': 'above-end',
    'above-start': 'below-start',
    'above-center': 'below-center',
    'above-end': 'below-end',
    'before-end': 'before-start',
    'before-center': 'after-center',
    'before-start': 'before-end',
    'after-end': 'after-start',
    'after-center': 'before-center',
    'after-start': 'after-end',
  };

  build(position: OverlayPosition): ConnectedPosition[] {
    return [
      this._positions[position],
      this._positions[this._positionPairs[position]],
    ];
  }
}
