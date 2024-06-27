import { Component, OnInit } from '@angular/core';

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
  ],
  templateUrl: './bill-list.component.html',
  providers: [BillService],
})
export class BillListComponent implements OnInit {
  constructor(private billService: BillService) {}

  public bill$ = this.billService.getBills();

  public bill = toSignal(this.bill$, { initialValue: [] as Bill[] });

  public ngOnInit(): void {
    this.billService.getBills().subscribe(bills => {
      console.log(bills);
    });
  }
}
