import { Component, inject, Input } from '@angular/core';
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

import { AssistantSearchComponent } from '@layoutC/header/_assistant-search/assistant-search.component';
import { SoundEffectDirective } from '@shared/directives/sound-effect.directive';
import { ThemeManagerService } from '@shared/services/theme-manager.service';

import { IconComponent } from '@shared/components/icon';

import { LayoutApiService } from '../../../layout-api.service';
import { AvatarComponent } from '@shared/components/avatar';
import {
  PopoverComponent,
  PopoverTriggerForDirective,
} from '@shared/components/popover';

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
    AssistantSearchComponent,
    IconComponent,
    MatAnchor,
    SoundEffectDirective,
    AvatarComponent,
    PopoverComponent,
    PopoverTriggerForDirective,
    MatIcon,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'block w-full h-full',
  },
})
export class HeaderComponent {
  protected _themeManager = inject(ThemeManagerService);
  private _layoutApi = inject(LayoutApiService);

  private _router = inject(Router);

  public isDark = this._themeManager.isDark();

  @Input()
  public sidebarHidden = false;

  toggleSidebar(): void {
    if (!this.sidebarHidden) {
      this._layoutApi.hideSidebar('root');
    } else {
      this._layoutApi.showSidebar('root');
    }

    this.sidebarHidden = !this.sidebarHidden;
  }

  public logoutHandler(): void {
    this._router.navigateByUrl('/auth/sign-in');
  }
}
