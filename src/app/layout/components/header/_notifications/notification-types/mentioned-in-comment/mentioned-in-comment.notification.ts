import { Component, Input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { Notification } from '@layoutC/header/_notifications/types';

import { IconComponent } from '@shared/components/icon';
import { AvatarComponent } from '@shared/components/avatar';

@Component({
  selector: 'app-mentioned-in-comment',
  standalone: true,
  imports: [
    MatIcon,
    MatRipple,
    RouterLink,
    IconComponent,
    AvatarComponent
],
  templateUrl: './mentioned-in-comment.notification.html',
  styleUrl: './mentioned-in-comment.notification.scss'
})
export class MentionedInCommentNotification {
  @Input()
  notification: Notification;
}
