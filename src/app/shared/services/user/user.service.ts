import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { User } from '@shared/models/user';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  public isLoading = signal(false);

  public userData = signal<User | null>(null);

  private _destroy$ = inject(DestroyRef);

  public getUserData(usernameOrEmail: string): void {
    this.startLoading();

    this._http
      .get<User>(`${this.apiUrl}/user/data/${usernameOrEmail}`)
      .pipe(
        switchMap(response => {
          return this._http.get<User>(`${this.apiUrl}/user/${response.id}`);
        }),
        tap(response => this.userData.set(response)),
        takeUntilDestroyed(this._destroy$)
      )
      .subscribe({
        error: error => {
          const errorMessage = `Error: Something went wrong, try again later (${error.message})`;
          throw new Error(errorMessage);
        },
      }),
      finalize(() => this.startLoading());
  }

  public startLoading() {
    this.isLoading.set(true);
  }

  public stopLoading() {
    this.isLoading.set(false);
  }
}
