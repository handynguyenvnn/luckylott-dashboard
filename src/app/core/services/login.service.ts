import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AccountService, AuthServerProvider} from '..';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService,
              private authServerProvider: AuthServerProvider,
              protected http: HttpClient,
              ) {}

  public login(credentials, callback?) {
    // tslint:disable-next-line:only-arrow-functions
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        (data) => {
          this.accountService.identity(true).then((account) => {
            resolve(data);
          });
          return cb();
        },
        (err) => {
          this.logout();
          reject(err);
          return cb(err);
        },
      );
    });
  }

  public loginWithToken(jwt, rememberMe) {
    return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }

  public getToken(): string {
    return this.authServerProvider.getToken();
  }

  public logout() {
    this.authServerProvider.logout().subscribe(null, null,
      () => {
        this.accountService.authenticate(null);
      });
  }

}
