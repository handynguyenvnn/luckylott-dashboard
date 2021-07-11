import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  public getToken() {
    return this.$localStorage.retrieve(environment.KEY_TOKEN) || this.$sessionStorage.retrieve(environment.KEY_TOKEN);
  }

  public login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe,
    };
    return this.http.post(environment.SERVER_API_URL + 'api/authenticate', data, { observe: 'response' })
                                                                                    .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const bearerToken = resp.headers.get('Authorization');
      const self = this;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        self.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }
  }

  public loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  public storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store(environment.KEY_TOKEN, jwt);
    } else {
      this.$sessionStorage.store(environment.KEY_TOKEN, jwt);
    }
  }

  public logout(): Observable<any> {
    return new Observable((observer) => {
      this.$localStorage.clear(environment.KEY_TOKEN);
      this.$sessionStorage.clear(environment.KEY_TOKEN);
      observer.complete();
    });
  }

  public getTokenExpirationDate(): Date {
    const token = this.getToken();
    if (token === null) {
      return null;
    }

    const decoded = jwt_decode(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate();
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

  /**
   * @param key this is a key in token
   * @return any
   */
  public getTokenValueByKey(key: string): any {
    const tokenInform = jwt_decode(this.getToken());
    return tokenInform[key];
  }

  public hasAnyAuthority(authorities: string[]): boolean {
    const token = this.getToken();

    if (token === null) {
      return false;
    }

    // decode the token to get its payload
    const tokenPayload = jwt_decode(token);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < authorities.length; i++) {
      if (tokenPayload.auth.indexOf(authorities[i]) !== -1) {
        return true;
      }
    }

    return false;
  }

  public hasAuthority(authority: string): boolean {
    const token = this.getToken();

    if (token === null) {
      return false;
    }

    // decode the token to get its payload
    const tokenPayload = jwt_decode(token);
    const auth = tokenPayload.auth;
    return (auth && auth.indexOf(authority) !== -1);
  }
}
