import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';

import { AsyncPipe, NgIf } from '@angular/common';
import { CategoryService } from '@adminS/category/category.service';

import { categoryForm } from '../../constants/category-forms';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-category',
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
  templateUrl: `./add-category.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent {
  private _formBuilder = inject(FormBuilder);

  private _categoryService = inject(CategoryService);

  private _destroy$ = inject(DestroyRef);

  private _snackBarService = inject(SnackbarService);

  public readonly addCategoryForm = this._formBuilder.group({
    ...categoryForm,
  });

  public categories$ = this._categoryService.getCategoriesUsage();

  public readonly isLoadingCategory = this._categoryService.isLoadingCategory;

  public onInsertCategoryHandler(): void {
    this._categoryService.startLoading();

    const { title, description } = this.addCategoryForm.value as Category;

    const newBill = {
      title,
      description,
    } as Category;

    this._createCategory(newBill);
  }

  private _createCategory(category: Category) {
    this._categoryService
      .createCategory(category)
      .pipe(
        finalize(() => this._categoryService.stopLoading()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        complete: () => {
          this._snackBarService.showRightTopMessage(
            'Category sucessfully created'
          );
        },
      });
  }
}
