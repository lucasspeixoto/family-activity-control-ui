import {
  AfterViewInit,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../model/category';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BillListActionsComponent } from '@billC/bill-list-actions/bill-list-actions.component';
import { VDividerComponent } from '@sharedC/divider';
import { LoadingComponent } from '@sharedC/loading/loading.component';
import {
  SegmentedButtonComponent,
  SegmentedComponent,
} from '@sharedC/segmented/public-api';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    LoadingComponent,
    MatPaginator,
    MatTooltip,
    MatButton,
    MatIcon,
    VDividerComponent,
    MatIconButton,
    SegmentedButtonComponent,
    SegmentedComponent,
    AsyncPipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatLabel,
    DatePipe,
    MatSortModule,
    MatCheckboxModule,
    BillListActionsComponent,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements AfterViewInit {
  @ViewChild(MatSort) public sort: MatSort;

  @ViewChild(MatPaginator) public paginator: MatPaginator;

  private _categoryService = inject(CategoryService);

  public getCategory$ = this._categoryService.getCategories();

  public isCategorySelected = this._categoryService.isCategorySelected;

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

  public onSelectBillChange(row: Category): void {
    this.selectedCategory =
      this.selectedCategory === row ? null : (row as Category);
    this._categoryService.setSelectedCategory(this.selectedCategory);
  }
}
