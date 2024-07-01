import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { MatRipple } from '@angular/material/core';

import { NgTemplateOutlet } from '@angular/common';

import { NotificationComponent } from '../notification/notification.component';

import { HDividerComponent } from '@shared/components/divider';

import { Notification } from '../types';
import {
  SkeletonBlockComponent,
  SkeletonCircleComponent,
  SkeletonComponent,
  SkeletonLineComponent,
} from '@shared/components/skeleton';

@Component({
  selector: 'app-header-notification-list',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    MatRipple,
    NotificationComponent,
    NgTemplateOutlet,
    HDividerComponent,
    SkeletonLineComponent,
    SkeletonComponent,
    SkeletonBlockComponent,
    SkeletonCircleComponent,
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  notifications: Notification[] = [
    {
      actor: {
        name: 'Liana Fernandes',
        username: 'liana.fernandes',
        avatarUrl: 'https://avatar.iran.liara.run/public',
      },
      message:
        'Hey there, how are you ? I have news, the Family Activity Control is ready to use',
      createdAt: '1 hour ago',
    },
  ];
}
