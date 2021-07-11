import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IDeposit} from '../../shared/model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityResponseType = HttpResponse<IDeposit>;
type EntityArrayResponseType = HttpResponse<IDeposit[]>;

@Injectable({ providedIn: 'root' })
export class DepositService {
  public resourceUrl = environment.SERVER_API_URL + 'api/deposits';

  constructor(protected http: HttpClient) {}

  create(deposit: IDeposit): Observable<EntityResponseType> {
    return this.http.post<IDeposit>(this.resourceUrl, deposit, { observe: 'response' });
  }

  update(deposit: IDeposit): Observable<EntityResponseType> {
    return this.http.put<IDeposit>(this.resourceUrl, deposit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeposit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeposit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
