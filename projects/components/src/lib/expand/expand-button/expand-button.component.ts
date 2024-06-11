import { Component } from '@angular/core';

@Component({
  selector: 'fac-expand-button,[fac-expand-button]',
  exportAs: 'facExpandButton',
  templateUrl: './expand-button.component.html',
  styleUrl: './expand-button.component.scss',
  host: {
    'class': 'fac-expand-button'
  }
})
export class ExpandButtonComponent {
}
