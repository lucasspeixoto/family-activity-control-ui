import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Signin, Signup } from '@auth/constants/forms';
import { SigninResponse } from '@auth/models/signin';
import { SignupResponse } from '@auth/models/signup';

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

  public isUserAdmin = signal(false);

  public isUserAuthenticated = signal(false);

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

  public isUserAdminCheckHandler(username: string): Observable<boolean> {
    return this._http
      .get<boolean>(`${this.apiUrl}/auth/user-role?username=${username}`)
      .pipe(tap(response => this.isUserAdmin.set(response)));
  }

  public isUserAuthenticatedHandler(): Observable<boolean> {
    const headers = this.buildRequestHeadersWithToken('FAC:access_token');

    return this._http
      .get<boolean>(`${this.apiUrl}/auth/is-authenticated`, headers)
      .pipe(tap(response => this.isUserAuthenticated.set(response)));
  }

  public refreshTokenHandler(
    usernameOrEmail: string
  ): Observable<SigninResponse> {
    const headers = this.buildRequestHeadersWithToken('FAC:refresh_token');

    return this._http
      .get<SigninResponse>(
        `${this.apiUrl}/auth/refresh/${usernameOrEmail}`,
        headers
      )
      .pipe(tap(response => this.authenticatedSuccessHandler(response)));
  }

  public buildRequestHeadersWithToken(tokenAlias: string): {
    headers: HttpHeaders;
  } {
    const token = sessionStorage.getItem(tokenAlias) as string;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return {
      ...httpOptions,
      headers: httpOptions.headers.set('Authorization', `Bearer ${token}`),
    };
  }

  public authenticatedSuccessHandler(signinResponse: SigninResponse): void {
    this.signinResponse.set(signinResponse);

    const { accessToken, refreshToken } = signinResponse;

    this.setAuthenticationTokens(accessToken, refreshToken);
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
