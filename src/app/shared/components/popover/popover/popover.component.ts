import { Component } from '@angular/core';

@Component({
    selector: 'fac-popover',
    exportAs: 'facPopover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    host: {
        'class': 'fac-popover'
    },
    standalone: true
})
export class PopoverComponent {
}
