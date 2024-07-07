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
  MatDialogRef,
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
  template: `
    @if (data) {
      <div class="dark:bg-neutral-900 bg-neutral-100">
        <h3 mat-dialog-title>{{ data.title }}</h3>
        <mat-dialog-content class="mat-typography">{{
          data.subtitle
        }}</mat-dialog-content>
        <mat-dialog-actions align="end">
          <button
            mat-flat-button
            mat-dialog-close
            [mat-dialog-close]="true"
            (click)="onCancel()">
            {{ data.cancelButtonTitle }}
          </button>
          <button
            mat-flat-button
            mat-dialog-close
            [mat-dialog-close]="true"
            color="primary"
            (click)="onConfirm()">
            {{ data.confirmationButtonTitle }}
          </button>
        </mat-dialog-actions>
      </div>
    }
  `,
  styles: [``],
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationData,
    public matDialogRef: MatDialogRef<ConfirmationComponent>
  ) {}

  public onCancel(): void {
    this.matDialogRef.close('cancel');
  }

  public onConfirm(): void {
    this.matDialogRef.close('confirm');
  }
}
