import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[facAutoFocus]',
  exportAs: 'appAutoFocus',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  private _elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.focus();
  }
}
