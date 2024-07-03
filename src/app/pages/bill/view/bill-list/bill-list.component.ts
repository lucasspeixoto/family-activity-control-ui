import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
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

  selection = new SelectionModel<Bill>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.billsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.billsDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Bill): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

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
