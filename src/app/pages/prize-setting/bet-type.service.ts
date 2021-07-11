import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IBetType} from '../../shared/model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityResponseType = HttpResponse<IBetType>;
type EntityArrayResponseType = HttpResponse<IBetType[]>;

@Injectable({ providedIn: 'root' })
export class BetTypeService {
  public resourceUrl = environment.SERVER_API_URL + 'api/bet-types';

  constructor(protected http: HttpClient) {}

  create(betType: IBetType): Observable<EntityResponseType> {
    return this.http.post<IBetType>(this.resourceUrl, betType, { observe: 'response' });
  }

  update(betType: IBetType): Observable<EntityResponseType> {
    return this.http.put<IBetType>(this.resourceUrl, betType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBetType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBetType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
