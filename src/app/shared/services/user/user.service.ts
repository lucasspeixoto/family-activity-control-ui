import { inject, Injectable, signal } from '@angular/core';
import { User } from '@shared/models/user';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  public isLoading = signal(false);

  public userData = signal<User | null>(null);

  public getUserData(usernameOrEmail: string): Observable<User> {
    this.startLoading();

    return this._http
      .get<User>(`${this.apiUrl}/user/data/${usernameOrEmail}`)
      .pipe(
        finalize(() => this.stopLoading()),
        switchMap(response => {
          return this._http.get<User>(`${this.apiUrl}/user/${response.id}`);
        }),
        tap(response => this.userData.set(response))
      );
  }

  public startLoading() {
    this.isLoading.set(true);
  }

  public stopLoading() {
    this.isLoading.set(false);
  }
}
