import { Component } from '@angular/core';

@Component({
  selector: 'fac-command-bar-value',
  exportAs: 'facCommandBarValue',
  templateUrl: './command-bar-value.component.html',
  styleUrl: './command-bar-value.component.scss',
  host: {
    'class': 'fac-command-bar-value'
  }
})
export class CommandBarValueComponent {
}
