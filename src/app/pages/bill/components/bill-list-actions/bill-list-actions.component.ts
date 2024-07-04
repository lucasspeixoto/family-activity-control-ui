import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { VDividerComponent } from '@shared/components/divider';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill-list-actions',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    VDividerComponent,
    MatIconButton,
    AddBillComponent,
  ],
  template: `
    <div class="px-10 h-16">
      <div
        class="border-b dark:border-b-inverse h-full w-full flex items-center justify-between">
        <div class="flex items-center gap-1 md:gap-7">
          <div class="text-lg font-bold hidden md:block">Bills</div>
          <div class="hidden md:block">
            <app-v-divider class="my-3 h-8"></app-v-divider>
          </div>
          <div class="flex items-center gap-4">
            <button
              [disabled]="!billService.isABillSelected()"
              mat-stroked-button
              color="primary"
              (click)="onUpdateBill()">
              <mat-icon class="font-icon">edit</mat-icon>Update
            </button>
            <button
              [disabled]="!billService.isABillSelected()"
              mat-stroked-button
              color="warn"
              (click)="onDeleteBill()">
              <mat-icon class="font-icon">delete</mat-icon>Delete
            </button>
          </div>
        </div>
        <div class="my-4 w-full mx-4 flex items-center justify-end">
          <mat-icon
            class="text-neutral-500 dart:text-neutral-300 font-icon search-icon relative left-8"
            >search</mat-icon
          >
          <input
            type="text"
            class="pl-10 outline-none placeholder-neutral-500 dark:placeholder-neutral-300 border-none text-xs sm:text-md bg-neutral-200 dark:bg-neutral-700 py-3 rounded-lg"
            (keyup)="applyBillsFilter($event)"
            placeholder="Filter bills..."
            #input />
        </div>
        <div class="hidden sm:block">
          <button mat-flat-button (click)="addNewBillHandler()">
            <mat-icon class="font-icon">add</mat-icon> New
          </button>
        </div>
        <div class="block sm:hidden">
          <button mat-mini-fab (click)="addNewBillHandler()">
            <mat-icon class="font-icon text-primary">add</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillListActionsComponent {
  @Output() applyBillsFilterHandler = new EventEmitter();

  private _dialog = inject(MatDialog);

  public billService = inject(BillService);

  public applyBillsFilter(event: Event) {
    this.applyBillsFilterHandler.emit(event);
  }

  public addNewBillHandler(): void {
    this._dialog.open(AddBillComponent, {
      minWidth: '45%',
    });
  }

  public onUpdateBill(): void {
    console.log(this.billService.selectedBill());
  }

  public onDeleteBill(): void {
    console.log(this.billService.selectedBill());
  }
}
