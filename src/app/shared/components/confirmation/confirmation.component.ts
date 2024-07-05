import { A11yModule } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

interface ConfirmationData {
  title: string;
  subtitle: string;
  cancelButtonTitle: string;
  confirmationButtonTitle: string;
  id: string;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [
    A11yModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  @Output()
  public confirmClicked = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationData
  ) {}

  public confirm(): void {
    this.confirmClicked.emit(true);
  }
}
