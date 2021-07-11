import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor(private http: HttpClient) {}

  save(newPassword: string, currentPassword: string): Observable<any> {
    return this.http.post(environment.SERVER_API_URL + 'api/account/change-password', { currentPassword, newPassword });
  }

  agentChangePwd(login: string, newPassword: string): Observable<any> {
    return this.http.post(environment.SERVER_API_URL + 'api/agent/change-password', { login, newPassword });
  }
}
