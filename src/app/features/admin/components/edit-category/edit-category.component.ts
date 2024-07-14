import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CategoryService } from '@app/features/admin/services/category/category.service';
import { categoryForm } from '../../constants/category-forms';
import { Category } from '../../model/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
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
  templateUrl: `./edit-category.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategoryComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  private _categoryService = inject(CategoryService);

  private _destroy$ = inject(DestroyRef);

  private _snackbarService = inject(SnackbarService);

  public readonly editCategoryForm = this._formBuilder.group({
    ...categoryForm,
  });

  public categories$ = this._categoryService.getCategoriesUsage();

  public readonly isLoadingCategory = this._categoryService.isLoadingCategory;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Category) {}

  public ngOnInit(): void {
    const { id, title, description } = this.data as Category;

    this.editCategoryForm.setValue({
      title,
      id: id!,
      description,
    });
  }

  public onUpdateCategoryHandler(): void {
    this._categoryService.startLoading();

    const { id, title, description } = this.editCategoryForm.value as Category;

    const updatedCategory = {
      id,
      title,
      description,
    } as Category;

    this._updateCategory(updatedCategory);
  }

  private _updateCategory(category: Category) {
    this._categoryService
      .updateCategory(category)
      .pipe(
        finalize(() => this._categoryService.stopLoading()),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        complete: () => {
          this._categoryService.setSelectedCategory(null);

          this._snackbarService.showRightTopMessage(
            'Category sucessfully updated'
          );
        },
      });
  }
}
