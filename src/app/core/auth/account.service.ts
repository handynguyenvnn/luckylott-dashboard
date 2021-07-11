import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private SERVER_API_URL: any;

  constructor(private sessionStorage: SessionStorageService,
              private http: HttpClient) {
    this.SERVER_API_URL = environment.SERVER_API_URL;
  }

  public fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(this.SERVER_API_URL + 'api/account', { observe: 'response' });
  }

  public save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.SERVER_API_URL + 'api/account', account, { observe: 'response' });
  }

  public authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  public hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  public hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      (id) => {
        // @ts-ignore
        return Promise.resolve(id.authorities && id.authorities.includes(authority));
      },
      () => {
        return Promise.resolve(false);
      },
    );
  }

  public identity(force?: boolean): Promise<Account> {
    if (force) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.fetch()
      .toPromise()
      .then((response) => {
        const account: Account = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch((err) => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      });
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  public getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  public getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }

  public updatePassword(newPassword: string, currentPassword: string): Observable<any> {
    return this.http.post(this.SERVER_API_URL + 'api/account/change-password', { currentPassword, newPassword });
  }
}
