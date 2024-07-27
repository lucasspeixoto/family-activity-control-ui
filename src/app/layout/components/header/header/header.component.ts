import { Component, HostListener, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';

import { NotificationListComponent } from '@layoutC/header/_notifications/notification-list/notification-list.component';

import { SoundEffectDirective } from '@sharedD/sound-effect.directive';
import { ThemeManagerService } from '@sharedS/theme-manager.service';

import { IconComponent } from '@shared/components/icon';

import { LayoutApiService } from '@layout/layout-api.service';
import { AvatarComponent } from '@shared/components/avatar';
import {
  PopoverComponent,
  PopoverTriggerForDirective,
} from '@shared/components/popover';
import { AuthenticationService } from '@app/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    AsyncPipe,
    MatFormField,
    MatInput,
    MatPrefix,
    MatBadge,
    MatMenu,
    MatMenuTrigger,
    NgTemplateOutlet,
    MatMenuItem,
    MatDivider,
    MatButton,
    MatTooltip,
    NotificationListComponent,
    RouterLink,
    IconComponent,
    MatAnchor,
    SoundEffectDirective,
    AvatarComponent,
    PopoverComponent,
    PopoverTriggerForDirective,
    MatIcon,
  ],
  templateUrl: './header.component.html',
  styles: ``,
  host: {},
})
export class HeaderComponent {
  @Input() public sidebarHidden = false;

  protected _themeManager = inject(ThemeManagerService);

  private _layoutApi = inject(LayoutApiService);

  private _router = inject(Router);

  private _authenticationService = inject(AuthenticationService);

  public isDark$ = this._themeManager.isDark();

  public innerWidth: number;

  public toggleSidebar(): void {
    if (!this.sidebarHidden) {
      this._layoutApi.hideSidebar('root');
    } else {
      this._layoutApi.showSidebar('root');
    }

    this.sidebarHidden = !this.sidebarHidden;
  }

  public logoutHandler(): void {
    this._authenticationService.removeAuthenticationTokens();

    this._router.navigateByUrl('/auth/signin');
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event: Event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 991) {
      this._layoutApi.hideSidebar('root');
      this.sidebarHidden = true;
    } else {
      this._layoutApi.showSidebar('root');
      this.sidebarHidden = false;
    }
  }
}
