import { Component } from '@angular/core';

@Component({
  selector: 'fac-layout-header',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: block;
      flex: none;
    }
  `,
})
export class LayoutHeaderComponent {}
