import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@layoutC/header/header/header.component';
import { SidebarComponent } from '@layoutC/sidebar/sidebar/sidebar.component';
import {
  LayoutComponent,
  LayoutBodyComponent,
  LayoutSidebarComponent,
  LayoutHeaderComponent,
  LayoutTopbarComponent,
} from '../../layout';

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
    LayoutTopbarComponent,
  ],
  templateUrl: './common.component.html',
})
export class CommonComponent {}
