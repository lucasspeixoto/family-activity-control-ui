import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { billForm } from '../../constants/bill-forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { billTypeOptions } from '../../constants/options';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../model/bill';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { AdminService } from '@app/features/admin/services/admin.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-bill',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatProgressSpinnerModule,
    MatLabel,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatError,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: `./add-bill.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBillComponent {
  private _formBuilder = inject(FormBuilder);

  private _billService = inject(BillService);

  private _adminService = inject(AdminService);

  private _destroy$ = inject(DestroyRef);

  private _snackBarService = inject(SnackbarService);

  public readonly addNewBillForm = this._formBuilder.group({
    ...billForm,
  });

  public getCategories$ = this._adminService.getCategoriesUsage();

  public categories = this._adminService.categories;

  public readonly billTypeOptions = billTypeOptions;

  public readonly isLoadingBill = this._billService.isLoadingBill;

  public onInsertBillHandler(): void {
    this._billService.startLoadingBill();

    const { title, owner, amount, category, description, finishAt, type } = this
      .addNewBillForm.value as Bill;

    const updatedFinishAt = new Date(finishAt);

    const newBill = {
      title,
      owner,
      amount,
      category,
      description,
      type,
      finishAt: updatedFinishAt.setHours(23, 59, 59, 999), // end of the day
    } as Bill;

    this._createBill(newBill);
  }

  private _createBill(bill: Bill) {
    this._billService
      .createBill(bill)
      .pipe(
        finalize(() => this._billService.stopLoadingBill()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        complete: () => {
          this._snackBarService.showRightTopMessage('Bill sucessfully created');
        },
      });
  }
}
