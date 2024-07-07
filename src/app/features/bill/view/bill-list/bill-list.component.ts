import {
  AfterViewInit,
  Component,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BILLS_TABLE_COLUMNS } from '../../constants/bills-table';
import { BillListActionsComponent } from '../../components/bill-list-actions/bill-list-actions.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
    MatCheckboxModule,
    BillListActionsComponent,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './bill-list.component.html',
  styles: ``,
})
export class BillListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  @ViewChild(MatSort) public sort: MatSort;

  private billService = inject(BillService);

  public billsDataSource = new MatTableDataSource<Bill>();

  public billsTableColumns = BILLS_TABLE_COLUMNS;

  public getBills$ = this.billService.getBills();

  public hasFetchBillError = this.billService.hasFetchBillError;

  public selectedFilterBillWord = signal('');

  public selectedBill!: Bill | null;

  constructor() {
    effect(() => {
      this.billsDataSource.data = this.billService.resources();
    });
  }

  public ngAfterViewInit() {
    this.billsDataSource.paginator = this.paginator;
    this.billsDataSource.sort = this.sort;
  }

  public onSelectBillChange(row: Bill): void {
    this.selectedBill = this.selectedBill === row ? null : (row as Bill);
    this.billService.setSelectedBill(this.selectedBill);
  }

  public billSearchTermEventHandler(filterValue: string) {
    const selectedFilterBillWord = filterValue.trim().toLowerCase();

    this.selectedFilterBillWord.set(selectedFilterBillWord);

    this.billsDataSource.filter = selectedFilterBillWord;
  }
}
