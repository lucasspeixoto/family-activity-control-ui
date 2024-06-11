import { Component, ElementRef, inject, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fac-color-picker-thumbnail,[fac-color-picker-thumbnail]',
  exportAs: 'facColorPickerThumbnail',
  templateUrl: './color-picker-thumbnail.component.html',
  styleUrls: ['./color-picker-thumbnail.component.scss'],
  host: {
    'class': 'fac-color-picker-thumbnail'
  }
})
export class ColorPickerThumbnailComponent {
  private _elementRef = inject(ElementRef);

  @Input()
  color: string;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.color) {
      return;
    }

    this._elementRef.nativeElement.style.setProperty('--fac-color-picker-thumbnail-bg', this.color);
  }
}
