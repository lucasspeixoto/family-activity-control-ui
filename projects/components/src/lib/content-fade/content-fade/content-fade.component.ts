import { Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'fac-content-fade',
  exportAs: 'facContentFade',
  templateUrl: './content-fade.component.html',
  styleUrl: './content-fade.component.scss',
  host: {
    'class': 'fac-content-fade'
  }
})
export class ContentFadeComponent {
  private _elementRef = inject(ElementRef);

  @Input()
  set color(color: string) {
    (this._elementRef.nativeElement as HTMLElement).style.setProperty('--fac-content-fade-color', color, 'important');
  }

  @Input()
  set width(width: string) {
    (this._elementRef.nativeElement as HTMLElement).style.setProperty('--fac-content-fade-width', width, 'important');
  }
}
