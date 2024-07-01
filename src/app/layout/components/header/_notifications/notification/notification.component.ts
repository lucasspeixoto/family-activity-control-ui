import { Component, Input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { Notification } from '@layoutC/header/_notifications/types';

import { IconComponent } from '@shared/components/icon';
import { AvatarComponent } from '@shared/components/avatar';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatIcon, MatRipple, RouterLink, IconComponent, AvatarComponent],
  templateUrl: './notification.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NotificationComponent {
  @Input() public notification: Notification;
}
