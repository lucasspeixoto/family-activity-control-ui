import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '@env/environment';

import { HttpClient } from '@angular/common/http';
import { Select } from '@shared/models/select';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  public categories = signal<Select[]>([]);

  public getCategoriesUsage(): Observable<Select[]> {
    return this._http
      .get<Select[]>(`${this.apiUrl}/category/usages`)
      .pipe(tap(categories => this.categories.set(categories)));
  }
}
