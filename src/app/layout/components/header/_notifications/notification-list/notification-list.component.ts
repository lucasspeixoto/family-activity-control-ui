import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { MatRipple } from '@angular/material/core';

import { NgTemplateOutlet } from '@angular/common';

import { MentionedInCommentNotification } from '../notification-types/mentioned-in-comment/mentioned-in-comment.notification';
import { InviteToEditFilesInFolderNotification } from '../notification-types/invite-to-edit-files-in-folder/invite-to-edit-files-in-folder.notification';

import { HDividerComponent } from '@shared/components/divider';

import { Notification } from '../types';
import { SkeletonBlockComponent, SkeletonCircleComponent, SkeletonComponent, SkeletonLineComponent } from '@shared/components/skeleton';

@Component({
  selector: 'app-header-notification-list',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    MatRipple,
    MentionedInCommentNotification,
    InviteToEditFilesInFolderNotification,
    NgTemplateOutlet,
    HDividerComponent,
    SkeletonLineComponent,
    SkeletonComponent,
    SkeletonBlockComponent,
    SkeletonCircleComponent
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  notifications: Notification[] = [
    {
      actor: {
        name: 'Justin Hansen',
        username: 'justin.hansen',
        avatarUrl: 'https://avatar.iran.liara.run/public',
      },
      notifier: {
        name: 'Elma Johnson',
        username: 'elma.johnson',
        avatarUrl: 'https://avatar.iran.liara.run/public',
      },
      entity: {
        content: 'what did you say?',
      },
      typeId: 'mentioned-in-comment',
      createdAt: '1 hour ago',
    },
    {
      actor: {
        name: 'Johnny Gladden',
        username: 'johnny.gladden',
        avatarUrl: 'https://avatar.iran.liara.run/public',
      },
      notifier: {
        name: 'Angela Naylor',
        username: 'angela.naylor',
        avatarUrl: 'https://avatar.iran.liara.run/public',
      },
      entity: {
        content: {
          folderName: 'My New Project',
        },
      },
      typeId: 'invite-to-edit-files-in-folder',
      createdAt: '2 hours ago',
    },
  ];
}
