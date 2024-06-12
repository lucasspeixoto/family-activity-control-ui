import { Component, Input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { EmrAvatarModule } from '@shared/components/avatar';
import { IconComponent } from '@shared/components/icon';
import { Notification } from '../../types';

@Component({
  selector: 'app-invite-to-edit-files-in-folder',
  standalone: true,
  imports: [
    EmrAvatarModule,
    MatIcon,
    MatRipple,
    RouterLink,
    MatButton,
    IconComponent
  ],
  templateUrl: './invite-to-edit-files-in-folder.notification.html',
  styleUrl: './invite-to-edit-files-in-folder.notification.scss'
})
export class InviteToEditFilesInFolderNotification {
  @Input()
  notification: Notification;
}
