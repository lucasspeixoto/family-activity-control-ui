import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { VDividerComponent } from '@sharedC/divider';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { BillService } from '@bill/services/bill.service';
import { EditBillComponent } from '../edit-bill/edit-bill.component';
import { DialogService } from '@sharedS/dialog/dialog.service';
import { ConfirmationComponent } from '@sharedC/confirmation/confirmation.component';
import { finalize, first } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfig } from '@shared/models/dialog-config.model';
import { ConfirmDialogResult } from '../../model/confirm-dialog-result';

@Component({
  selector: 'app-bill-list-actions',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    VDividerComponent,
    MatIconButton,
    AddBillComponent,
    ConfirmationComponent,
  ],
  template: `
    <div class="px-10 h-16">

      @let isABillSelected = isBillSelected();

      <div
        class="border-b dark:border-b-inverse h-full w-full flex items-center justify-between">
        <div class="flex items-center gap-1 md:gap-7">
          <div class="text-lg font-bold hidden md:block">Bills</div>
          <div class="hidden md:block">
            <app-v-divider class="my-3 h-8"></app-v-divider>
          </div>
          <div class="flex items-center gap-4">
            <!-- Update buttons -->
            <div class="hidden sm:flex">
              <button
                data-testid="update-button"
                mat-stroked-button
                color="primary"
                [disabled]="!isABillSelected"
                (click)="updateBillHandler()">
                <mat-icon class="font-icon">edit</mat-icon>Update
              </button>
            </div>
            <div class="flex sm:hidden">
              <button
                data-testid="update-button"
                mat-icon-button
                color="warn"
                position="below-end"
                [disabled]="!isABillSelected"
                (click)="updateBillHandler()">
                <mat-icon aria-hidden="false" class="text-primary font-icon"
                  >edit</mat-icon
                >
              </button>
            </div>
            <!-- Delete buttons -->
            <div class="hidden sm:flex">
              <button
                data-testid="delete-button"
                mat-stroked-button
                color="warn"
                [disabled]="!isABillSelected"
                (click)="deleteBillHandler()">
                <mat-icon class="font-icon">delete</mat-icon>
                Delete
              </button>
            </div>
            <div class="flex sm:hidden">
              <button
                data-testid="delete-button"
                [disabled]="!isABillSelected"
                (click)="deleteBillHandler()"
                mat-icon-button
                color="warn"
                position="below-end">
                <mat-icon aria-hidden="false" class="text-red-700 font-icon"
                  >delete</mat-icon
                >
              </button>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex my-4 w-full mx-4 items-center justify-end">
          <mat-icon
            class="text-neutral-500 dart:text-neutral-300 font-icon search-icon relative left-8"
            >search</mat-icon
          >
          <input
            data-testid="input-filter"
            type="text"
            class="pl-10 outline-none placeholder-neutral-500 dark:placeholder-neutral-300 border-none text-xs sm:text-md bg-neutral-200 dark:bg-neutral-700 py-3 rounded-lg"
            (keyup)="applyBillsFilter($event)"
            placeholder="Filter bills..."
            #input />
        </div>

        <button
          data-testid="add-button"
          mat-flat-button
          (click)="addNewBillHandler()">
          <mat-icon class="font-icon">add</mat-icon> New
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillListActionsComponent {
  @Output() billSearchTermEvent: EventEmitter<string> =
    new EventEmitter<string>();

  public debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  private _dialog = inject(MatDialog);

  private _dialogRef: MatDialogRef<ConfirmationComponent, ConfirmDialogResult>;

  private _dialogService = inject(DialogService);

  private _billService = inject(BillService);

  private _snackBar = inject(MatSnackBar);

  private _destroy$ = inject(DestroyRef);

  public isBillSelected = this._billService.isABillSelected;

  public applyBillsFilter(event: KeyboardEvent) {
    clearTimeout(this.debounceTimeout);
    const target = event.target as HTMLInputElement;

    this.debounceTimeout = setTimeout(() => {
      this.billSearchTermEvent.emit(target.value);
    }, 400);
  }

  public addNewBillHandler(): void {
    this._dialog.open(AddBillComponent, {
      minWidth: '45%',
    });
  }

  public updateBillHandler(): void {
    this._dialog.open(EditBillComponent, {
      minWidth: '45%',
      data: this._billService.selectedBill(),
    });
  }

  public deleteBillHandler(): void {
    const billId = this._billService.selectedBill()?.id as string;

    this._dialogRef = this._dialog.open(ConfirmationComponent, {
      width: '350px',
      data: this.getDeleteBillDialogData(billId),
    });

    this._dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === 'confirm') {
          this._billService
            .deleteBill(billId)
            .pipe(
              finalize(() => this._billService.stopLoadingBill()),
              takeUntilDestroyed(this._destroy$)
            )
            .subscribe({
              complete: () => {
                this._billService.setSelectedBill(null);

                this._snackBar.open('Bill successfully deleted', 'Close', {
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                });
              },
            });
        }
      });
  }

  public getDeleteBillDialogData(billId: string): DialogConfig {
    return this._dialogService.getDeleteDialogData(
      billId,
      'Delete Bill',
      'Do you realy want to delete this bill?'
    );
  }
}
