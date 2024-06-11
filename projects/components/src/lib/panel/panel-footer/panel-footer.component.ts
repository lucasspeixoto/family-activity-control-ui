import { Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'fac-panel-footer',
  exportAs: 'facPanelFooter',
  templateUrl: './panel-footer.component.html',
  styleUrls: ['./panel-footer.component.scss'],
  host: {
    'class': 'fac-panel-footer'
  }
})
export class PanelFooterComponent {
  private _elementRef = inject(ElementRef);

  @Input()
  set height(height: string | number) {
    this._elementRef.nativeElement.style.setProperty('--fac-panel-footer-height', height + 'px');
  }

  ngOnDestroy() {
    this._elementRef.nativeElement.style.removeProperty('--fac-panel-footer-height');
  }
}
