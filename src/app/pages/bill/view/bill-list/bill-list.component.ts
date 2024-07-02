import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { VDividerComponent } from '@shared/components/divider';
import {
  SegmentedButtonComponent,
  SegmentedComponent,
} from '@shared/components/segmented/public-api';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../model/bill';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BILLS_TABLE_COLUMNS } from '../../constants/bills-table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BillListActionsComponent } from '../../components/bill-list-actions/bill-list-actions.component';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatButton,
    MatIcon,
    VDividerComponent,
    MatIconButton,
    SegmentedButtonComponent,
    SegmentedComponent,
    AsyncPipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatLabel,
    DatePipe,
    MatSortModule,
    BillListActionsComponent,
  ],
  templateUrl: './bill-list.component.html',
  providers: [BillService],
  styles: ``,
})
export class BillListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  @ViewChild(MatSort) public sort: MatSort;

  private billService = inject(BillService);

  private destroy$ = inject(DestroyRef);

  public bills$ = this.billService.getBills();

  public billsDataSource = new MatTableDataSource<Bill>();

  public billsTableColumns = BILLS_TABLE_COLUMNS;

  public selectedFilterBillWord = signal('');

  public ngOnInit(): void {
    this.fetchBillsListHandler();
  }

  public ngAfterViewInit() {
    this.billsDataSource.paginator = this.paginator;
    this.billsDataSource.sort = this.sort;
  }

  public fetchBillsListHandler(): void {
    this.bills$.pipe(takeUntilDestroyed(this.destroy$)).subscribe(bills => {
      this.billsDataSource.data = bills;
    });
  }

  public applyBillsFilterHandler(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    const selectedFilterBillWord = filterValue.trim().toLowerCase();

    this.selectedFilterBillWord.set(selectedFilterBillWord);

    this.billsDataSource.filter = selectedFilterBillWord;
  }
}
