import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { environment } from '@env/environment';

import { Select } from '@shared/models/select';
import { Category } from '../../model/category';
import { ResourceService } from '@sharedS/resource/resource.service';
import { FeatureLoaderService } from '@sharedS/feature-loader.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ResourceService<Category> {
  public apiUrl = environment.apiUrl;

  public isLoadingCategory = signal(false);

  public hasFetchCategoryError = signal(false);

  public selectedCategory = signal<Category | null>(null);

  public isCategorySelected = computed(() => this.selectedCategory() !== null);

  private _featureLoader = inject(FeatureLoaderService);

  public getCategoriesUsage(): Observable<Select[]> {
    return this.http.get<Select[]>(`${this.apiUrl}/category/usages`);
  }

  public getCategories(): Observable<Category[]> {
    this.hasFetchCategoryError.set(false);

    this._featureLoader.show();

    return this.http.get<Category[]>(`${this.apiUrl}/category`).pipe(
      finalize(() => this._featureLoader.hide()),
      tap(this.setResources),
      catchError(error => {
        this.hasFetchCategoryError.set(true);

        return throwError(() => error);
      })
    );
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${this.apiUrl}/category/create`, category)
      .pipe(tap(this.upsertResource));
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http
      .put<Category>(`${this.apiUrl}/category/update/${category.id}`, category)
      .pipe(tap(this.upsertResource));
  }

  public deleteCategory(id: string): Observable<Category> {
    return this.http
      .delete<Category>(`${this.apiUrl}/category/delete/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  public setSelectedCategory(category: Category | null) {
    this.selectedCategory.set(category);
  }

  public startLoading() {
    this.isLoadingCategory.set(true);
  }

  public stopLoading() {
    this.isLoadingCategory.set(false);
  }
}
