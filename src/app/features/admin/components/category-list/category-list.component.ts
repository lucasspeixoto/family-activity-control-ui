import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  ViewChild,
} from '@angular/core';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryService } from '@adminS/category/category.service';
import { Category } from '../../model/category';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { VDividerComponent } from '@sharedC/divider';
import { LoadingComponent } from '@sharedC/loading/loading.component';
import {
  SegmentedButtonComponent,
  SegmentedComponent,
} from '@sharedC/segmented/public-api';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogResult } from '@bill/model/confirm-dialog-result';
import { ConfirmationComponent } from '@sharedC/confirmation/confirmation.component';
import { DialogService } from '@sharedS/dialog/dialog.service';
import { DialogConfig } from '@angular/cdk/dialog';
import { finalize, first } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgIf,

    MatPaginator,
    MatTooltip,
    MatButton,
    MatIcon,
    MatIconButton,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatLabel,
    MatSortModule,
    MatCheckboxModule,

    LoadingComponent,
    SegmentedButtonComponent,
    SegmentedComponent,
    ConfirmationComponent,
    VDividerComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements AfterViewInit {
  @ViewChild(MatSort) public sort: MatSort;

  @ViewChild(MatPaginator) public paginator: MatPaginator;

  private _categoryService = inject(CategoryService);

  private _dialog = inject(MatDialog);

  private _dialogRef: MatDialogRef<ConfirmationComponent, ConfirmDialogResult>;

  private _dialogService = inject(DialogService);

  private _destroy$ = inject(DestroyRef);

  private _snackBarService = inject(SnackbarService);

  public getCategory$ = this._categoryService.getCategories();

  public isCategorySelected = this._categoryService.isCategorySelected;

  public hasFetchCategoryError = this._categoryService.hasFetchCategoryError;

  public categoriesDataSource = new MatTableDataSource<Category>();

  public selectedCategory!: Category | null;

  public displayedColumns = ['select', 'title', 'description'];

  constructor() {
    effect(() => {
      this.categoriesDataSource.data = this._categoryService.resources();
    });
  }

  public ngAfterViewInit() {
    this.categoriesDataSource.sort = this.sort;
    this.categoriesDataSource.paginator = this.paginator;
  }

  public onSelectCategoryChange(row: Category): void {
    this.selectedCategory =
      this.selectedCategory === row ? null : (row as Category);
    this._categoryService.setSelectedCategory(this.selectedCategory);
  }

  public addCategoryHandler(): void {
    this._dialog.open(AddCategoryComponent, {
      minWidth: '45%',
    });
  }

  public updateCategoryHandler(): void {
    this._dialog.open(EditCategoryComponent, {
      minWidth: '45%',
      data: this._categoryService.selectedCategory(),
    });
  }

  public deleteCategoryHandler(): void {
    const categoryId = this._categoryService.selectedCategory()!.id as string;

    this._dialogRef = this._dialog.open(ConfirmationComponent, {
      width: '350px',
      data: this.getDeleteCategoryDialogData(categoryId),
    });

    this._dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === 'confirm') {
          this._categoryService
            .deleteCategory(categoryId)
            .pipe(
              finalize(() => this._categoryService.startLoading()),
              takeUntilDestroyed(this._destroy$)
            )
            .subscribe({
              complete: () => {
                this._categoryService.setSelectedCategory(null);

                this._snackBarService.showRightTopMessage(
                  'Category sucessfully deleted'
                );
              },
            });
        }
      });
  }

  public getDeleteCategoryDialogData(categoryId: string): DialogConfig {
    return this._dialogService.getDeleteDialogData(
      categoryId,
      'Delete Category',
      'Do you realy want to delete this Category?'
    );
  }
}
