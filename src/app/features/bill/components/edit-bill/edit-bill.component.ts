import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { billForm } from '@bill/constants/bill-forms';
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { billTypeOptions } from '@bill/constants/options';
import { BillService } from '@bill/services/bill.service';
import { Bill } from '@bill/model/bill';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { CategoryService } from '@adminS/category/category.service';

@Component({
  selector: 'app-edit-bill',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
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
  templateUrl: `./edit-bill.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBillComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  private _billService = inject(BillService);

  private _categoryService = inject(CategoryService);

  private _destroy$ = inject(DestroyRef);

  private _snackbarService = inject(SnackbarService);

  public readonly editBillForm = this._formBuilder.group({
    ...billForm,
  });

  public categories$ = this._categoryService.getCategoriesUsage();

  public billTypeOptions = billTypeOptions;

  public readonly isLoadingBill = this._billService.isLoadingBill;

  public selectedCategoryValue!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Bill) {}

  public ngOnInit(): void {
    const {
      id,
      title,
      owner,
      amount,
      categoryId,
      description,
      finishAt,
      type,
    } = this.data as Bill;

    this.editBillForm.setValue({
      title,
      id,
      owner,
      amount,
      categoryId,
      description,
      type,
      finishAt: new Date(finishAt),
    });
  }

  public onUpdateBillHandler(): void {
    this._billService.startLoadingBill();

    const {
      id,
      title,
      owner,
      amount,
      categoryId,
      description,
      finishAt,
      type,
    } = this.editBillForm.value as Bill;

    const updatedFinishAt = new Date(finishAt);

    const updatedBill = {
      id,
      title,
      owner,
      amount,
      categoryId,
      description,
      type,
      finishAt: updatedFinishAt.setHours(23, 59, 59, 999), // end of the day
    } as Bill;

    this._updateBill(updatedBill);
  }

  private _updateBill(bill: Bill) {
    this._billService
      .updateBill(bill)
      .pipe(
        finalize(() => this._billService.stopLoadingBill()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        complete: () => {
          this._billService.setSelectedBill(null);

          this._snackbarService.showRightTopMessage('Bill sucessfully updated');
        },
      });
  }
}
