import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
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
