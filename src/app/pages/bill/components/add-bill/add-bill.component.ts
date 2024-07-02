import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { addEdditBillForm } from '../../constants/bill-forms';
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
  MatDialogRef,
} from '@angular/material/dialog';
import { billCategoryOptions, billTypeOptions } from '../../constants/options';

@Component({
  selector: 'app-add-bill',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormField,
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
  styles: `
    .mat-mdc-form-field-error-wrapper {
      padding: 0px !important;
      margin: 0px !important;
    }

    .mat-mdc-form-field-error-wrapper {
      padding: 0px !important;
      margin: 0px !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddBillComponent {
  private _formBuilder = inject(FormBuilder);

  public addNewBillForm = this._formBuilder.group({ ...addEdditBillForm });

  private _dialogRef = inject(MatDialogRef<AddBillComponent>);

  public readonly billCategoryOptions = billCategoryOptions;

  public readonly billTypeOptions = billTypeOptions;

  public onCancelClick(): void {
    this._dialogRef.close();
  }
}
