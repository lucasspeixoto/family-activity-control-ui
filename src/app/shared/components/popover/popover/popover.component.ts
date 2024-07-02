import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  exportAs: 'appPopover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  host: {
    class: 'app-popover',
  },
  standalone: true,
})
export class PopoverComponent {}
