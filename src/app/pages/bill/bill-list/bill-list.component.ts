import { Component } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { VDividerComponent } from '@shared/components/divider';
import {
  SegmentedButtonComponent,
  SegmentedComponent,
} from '@shared/components/segmented/public-api';
import { BillService } from '../services/bill.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Bill } from '../model/bill';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-bill-list',
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
    JsonPipe,
    NgIf,
    AsyncPipe,
    MatTableModule,
  ],
  templateUrl: './bill-list.component.html',
  providers: [BillService],
})
export class BillListComponent {
  public status = 'all';

  constructor(private billService: BillService) {}

  public bills$ = this.billService.getBills();

  public bills = toSignal(this.bills$, { initialValue: [] as Bill[] });

  displayedColumns: string[] = ['id', 'title', 'owner', 'amount'];
}
