import { Component, inject, OnInit } from '@angular/core';
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
  ],
  templateUrl: './common.component.html',
})
export class CommonComponent implements OnInit {
  public globalStore = inject(GlobalStore);

  private _userService = inject(UserService);

  public ngOnInit(): void {
    let token = null;

    if (typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('FAC:access_token') as string;
    }

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      this._userService.getUserData(decodedToken.sub);
    }
  }
}
