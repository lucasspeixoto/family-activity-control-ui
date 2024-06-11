import { Component } from '@angular/core';

@Component({
  selector: 'fac-command-bar-separator',
  exportAs: 'facCommandBarSeparator',
  templateUrl: './command-bar-separator.component.html',
  styleUrl: './command-bar-separator.component.scss',
  host: {
    'class': 'fac-command-bar-separator'
  }
})
export class CommandBarSeparatorComponent {
}
