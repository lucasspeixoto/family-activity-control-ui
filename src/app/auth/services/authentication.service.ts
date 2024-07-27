import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Signin, Signup } from '@app/auth/constants/forms';
import { SigninResponse } from '@app/auth/models/signin';
import { SignupResponse } from '@app/auth/models/signup';

import { environment } from '@env/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  public isLoading = signal(false);

  public hasRegisteringError = signal(false);

  public signupResponse = signal<SignupResponse | null>(null);

  public signinResponse = signal<SigninResponse | null>(null);

  public signupUserHandler(signup: Signup): Observable<SignupResponse> {
    return this._http
      .post<SignupResponse>(`${this.apiUrl}/auth/register`, signup)
      .pipe(tap(response => this.signupResponse.set(response)));
  }

  public signinUserHandler(signin: Signin): Observable<SigninResponse> {
    return this._http
      .post<SigninResponse>(`${this.apiUrl}/auth/login`, signin)
      .pipe(tap(response => this.authenticatedSuccessHandler(response)));
  }

  public refreshTokenHandler(
    usernameOrEmail: string
  ): Observable<SigninResponse> {
    const headers = this.buildRefreshTokenRequestHeaders();

    return this._http
      .get<SigninResponse>(
        `${this.apiUrl}/auth/refresh/${usernameOrEmail}`,
        headers
      )
      .pipe(tap(response => this.authenticatedSuccessHandler(response)));
  }

  public buildRefreshTokenRequestHeaders(): { headers: HttpHeaders } {
    const refreshToken = sessionStorage.getItem('FAC:refresh_token') as string;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return {
      ...httpOptions,
      headers: httpOptions.headers.set(
        'Authorization',
        `Bearer ${refreshToken}`
      ),
    };
  }

  public authenticatedSuccessHandler(signinResponse: SigninResponse): void {
    this.signinResponse.set(signinResponse);
    sessionStorage.setItem('FAC:access_token', signinResponse.accessToken);
    sessionStorage.setItem('FAC:refresh_token', signinResponse.refreshToken);
  }

  public setAuthenticationTokens(
    accessToken: string,
    refreshToken: string
  ): void {
    sessionStorage.setItem('FAC:access_token', accessToken);
    sessionStorage.setItem('FAC:refresh_token', refreshToken);
  }

  public removeAuthenticationTokens(): void {
    sessionStorage.removeItem('FAC:access_token');
    sessionStorage.removeItem('FAC:refresh_token');
  }

  public startLoading() {
    this.isLoading.set(true);
  }

  public stopLoading() {
    this.isLoading.set(false);
  }
}
