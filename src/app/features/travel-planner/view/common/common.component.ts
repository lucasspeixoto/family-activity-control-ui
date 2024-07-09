import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@layoutC/header/header/header.component';
import { SidebarComponent } from '@layoutC/sidebar/sidebar/sidebar.component';
import {
  LayoutComponent,
  LayoutBodyComponent,
  LayoutSidebarComponent,
  LayoutHeaderComponent,
} from '../../../../layout';
import { GlobalStore } from '@app/state/global.state';
import { LoadingComponent } from '@sharedC/loading/loading.component';

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
export class CommonComponent {
  public globalStore = inject(GlobalStore);
}
