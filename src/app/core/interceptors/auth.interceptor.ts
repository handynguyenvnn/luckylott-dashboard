import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly SERVER_API_URL: any;

  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {
    this.SERVER_API_URL = environment.SERVER_API_URL;
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url || (request.url.startsWith('http')
      && !(environment.SERVER_API_URL && request.url.startsWith(environment.SERVER_API_URL)))) {
      return next.handle(request);
    }

    const token = this.localStorage.retrieve(environment.KEY_TOKEN)
      || this.sessionStorage.retrieve(environment.KEY_TOKEN);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    return next.handle(request);
  }
}
