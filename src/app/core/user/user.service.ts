import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { createRequestOption } from '../../shared/util';
import { IUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = environment.SERVER_API_URL + 'api/users';
  public resourcePublicUrl = environment.SERVER_API_URL + 'api/public/users';

  constructor(private http: HttpClient) {}

  public create(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  public update(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  public find(login: string): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  public findById(id: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  public query(req?: any): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  public delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  public authorities(): Observable<string[]> {
    return this.http.get<string[]>(environment.SERVER_API_URL + 'api/users/authorities');
  }

  public findByLogin(login: string): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourcePublicUrl}/${login}`, { observe: 'response' });
  }
}
