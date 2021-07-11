import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import {IBetTypePrize} from '../../shared/model';

type EntityResponseType = HttpResponse<IBetTypePrize>;
type EntityArrayResponseType = HttpResponse<IBetTypePrize[]>;

@Injectable({ providedIn: 'root' })
export class BetTypePrizeService {
  public resourceUrl = environment.SERVER_API_URL + 'api/bet-type-prizes';

  constructor(protected http: HttpClient) {}

  create(betTypePrize: IBetTypePrize): Observable<EntityResponseType> {
    return this.http.post<IBetTypePrize>(this.resourceUrl, betTypePrize, { observe: 'response' });
  }

  update(betTypePrize: IBetTypePrize): Observable<EntityResponseType> {
    return this.http.put<IBetTypePrize>(this.resourceUrl, betTypePrize, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBetTypePrize>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBetTypePrize[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
