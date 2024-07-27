import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';

import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AvatarComponent } from '@shared/components/avatar';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-sidebar-toolbar',
  standalone: true,
  imports: [
    MatDivider,
    AsyncPipe,
    MatBadge,
    MatIcon,
    MatIconButton,
    MatTooltip,
    AvatarComponent,
  ],
  template: `
    <div class="flex items-center gap-2">
      <div class="text-sm">{{ userData()?.name }}</div>
      <div
        class="border flex items-center border-neutral-900 dark:border-neutral-200 h-5 leading-3 px-2 rounded-full font-bold text-4xs uppercase text-neutral-500 dark:text-neutral-200">
        Admin
      </div>
    </div>
    <div class="text-xs text-gray-500 mt-0.5 dark:text-gray-400">
      {{ userData()?.email }}
    </div>
    <div class="my-4">
      <mat-divider></mat-divider>
    </div>
    <div class="ms-auto flex items-center gap-2.5">
      <app-avatar
        text="PS"
        src="https://avatar.iran.liara.run/public"
        class="size-12"></app-avatar>
      <div
        class="flex items-center rounded-full p-1 gap-[0.5] bg-neutral-200 dark:bg-neutral-700 hover:text-neutral-900">
        <button mat-icon-button matTooltip="Settings">
          <mat-icon class="font-icon">settings</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Payments">
          <mat-icon class="font-icon">credit_card</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Notifications">
          <mat-icon
            aria-hidden="false"
            class="font-icon"
            matBadge="3"
            matBadgeColor="warn"
            matBadgeSize="small"
            >notifications</mat-icon
          >
        </button>
        <button mat-icon-button matTooltip="Logout" (click)="logoutHandler()">
          <mat-icon class="font-icon">logout</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ToolbarComponent {
  private _router = inject(Router);

  public userService = inject(UserService);

  public userData = this.userService.userData;

  public logoutHandler(): void {
    sessionStorage.removeItem('FAC:access_token');
    sessionStorage.removeItem('FAC:refresh_token');
    this._router.navigateByUrl('/auth/signin');
  }
}
