import { Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'fac-panel-header',
  exportAs: 'facPanelHeader',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss'],
  host: {
    'class': 'fac-panel-header'
  }
})
export class PanelHeaderComponent implements OnDestroy {
  private _elementRef = inject(ElementRef);

  @Input()
  set height(height: string | number) {
    this._elementRef.nativeElement.style.setProperty('--fac-panel-header-height', height + 'px');
  }

  ngOnDestroy() {
    this._elementRef.nativeElement.style.removeProperty('--fac-panel-header-height');
  }
}
