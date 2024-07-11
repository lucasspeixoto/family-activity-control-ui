import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { HttpClient } from '@angular/common/http';
import { Select } from '@shared/models/select';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  public getCategoriesUsage(): Observable<Select[]> {
    return this._http.get<Select[]>(`${this.apiUrl}/category/usages`);
  }
}
