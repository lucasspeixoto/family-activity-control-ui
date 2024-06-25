import { Component, inject } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

import { VDividerComponent } from '@shared/components/divider';
import {
  SegmentedButtonComponent,
  SegmentedComponent,
} from '@shared/components/segmented/public-api';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Post {
  id: string;
  title: string;
  author: User;
  status: string;
  createdAt: Date;
  publishedAt?: Date;
}

@Component({
  standalone: true,
  imports: [
    MatPaginator,
    FormsModule,
    MatButton,
    MatIcon,
    VDividerComponent,
    MatIconButton,
    SegmentedButtonComponent,
    SegmentedComponent,
  ],
  templateUrl: './bill-list.component.html',
})
export class BillListComponent {
  private _httpClient = inject(HttpClient);

  status = 'all';

  data: Post[] = [];
  selectedRows: Post[] = [];

  selectionChanged(rows: Post[]): void {
    this.selectedRows = rows;
  }
}
