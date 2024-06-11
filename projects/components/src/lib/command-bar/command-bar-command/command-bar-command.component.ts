import { Component, Input } from '@angular/core';

@Component({
  selector: 'fac-command-bar-command',
  exportAs: 'facCommandBarCommand',
  templateUrl: './command-bar-command.component.html',
  styleUrl: './command-bar-command.component.scss',
  host: {
    'class': 'fac-command-bar-command'
  }
})
export class CommandBarCommandComponent {
  @Input()
  shortcut: string;
}
