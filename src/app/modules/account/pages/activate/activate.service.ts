import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ActivateService {
  constructor(private http: HttpClient) {}

  get(key: string): Observable<any> {
    return this.http.get(environment.SERVER_API_URL + 'api/activate', {
      params: new HttpParams().set('key', key)
    });
  }
}
