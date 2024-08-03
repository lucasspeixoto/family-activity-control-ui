import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@layoutC/header/header/header.component';
import { SidebarComponent } from '@layoutC/sidebar/sidebar/sidebar.component';

import { GlobalStore } from '@app/state/global.state';
import { LoadingComponent } from '@sharedC/loading/loading.component';
import {
  LayoutComponent,
  LayoutBodyComponent,
  LayoutSidebarComponent,
  LayoutHeaderComponent,
} from '@app/layout';
import { DecodedToken } from '@shared/models/decoded-token';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@sharedS/user/user.service';
import { User } from '@shared/models/user';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '@authS/authentication.service';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LayoutBodyComponent,
    LayoutSidebarComponent,
    LayoutHeaderComponent,
    LoadingComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './common.component.html',
})
export class CommonComponent implements OnInit {
  public globalStore = inject(GlobalStore);

  private _userService = inject(UserService);

  private _authenticationService = inject(AuthenticationService);

  private _destroy$ = inject(DestroyRef);

  public userData$!: Observable<User>;

  public ngOnInit(): void {
    let token = null;

    if (typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('FAC:access_token') as string;
    }

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      const username = decodedToken.sub;

      this._userService
        .getUserData(username)
        .pipe(takeUntilDestroyed(this._destroy$))
        .subscribe();

      this._authenticationService
        .isUserAdminCheckHandler(username)
        .pipe(takeUntilDestroyed(this._destroy$))
        .subscribe();
    }
  }
}
