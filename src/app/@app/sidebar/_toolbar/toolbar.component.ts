import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';
import { EmrAvatarModule } from '../../../../lib/avatar';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-toolbar',
  standalone: true,
  imports: [
    MatDivider,
    AsyncPipe,
    EmrAvatarModule,
    MatBadge,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  public router = inject(Router);

  public logoutHandler(): void {
    this.router.navigateByUrl('/auth/sign-in');
  }

}
