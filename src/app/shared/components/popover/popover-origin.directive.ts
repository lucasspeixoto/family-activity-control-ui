import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[facPopoverOrigin]',
  exportAs: 'appPopoverOrigin',
  standalone: true,
})
export class PopoverOriginDirective {
  private _elementRef = inject(ElementRef);

  get api() {
    return {
      nativeElement: () => {
        return this._elementRef?.nativeElement;
      },
    };
  }
}
