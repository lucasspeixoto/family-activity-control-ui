import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
  ViewEncapsulation,
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { billCategoryOptions, billTypeOptions } from '../../constants/options';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../model/bill';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-edit-bill',
  standalone: true,
  imports: [
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
  encapsulation: ViewEncapsulation.None,
})
export class EditBillComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  private _billService = inject(BillService);

  private _snackBar = inject(MatSnackBar);

  private _destroy$ = inject(DestroyRef);

  public readonly editBillForm = this._formBuilder.group({
    ...billForm,
  });

  public readonly billCategoryOptions = billCategoryOptions;

  public readonly billTypeOptions = billTypeOptions;

  public readonly isLoadingBill = this._billService.isLoadingBill;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Bill) {}

  public ngOnInit(): void {
    const { id, title, owner, amount, category, description, finishAt, type } =
      this.data as Bill;

    this.editBillForm.setValue({
      id: id!,
      title,
      owner,
      amount,
      category,
      description,
      type,
      finishAt: new Date(finishAt),
    });
  }

  public onUpdateBillHandler(): void {
    this._billService.startLoadingBill();

    const { id, title, owner, amount, category, description, finishAt, type } =
      this.editBillForm.value as Bill;

    const updatedFinishAt = new Date(finishAt);

    const updatedBill = {
      id,
      title,
      owner,
      amount,
      category,
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

          this._snackBar.open('Bill sucessfully updated', 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }
}
