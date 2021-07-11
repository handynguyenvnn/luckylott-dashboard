import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IAgent, IBet, IBetGroup} from '../../shared/model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityResponseType = HttpResponse<IBet>;
type EntityArrayResponseType = HttpResponse<IBet[]>;

@Injectable({ providedIn: 'root' })
export class BetService {
  public resourceUrl = environment.SERVER_API_URL + 'api/bets';

  constructor(protected http: HttpClient) {}

  create(bet: IBet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bet);
    return this.http
      .post<IBet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bet: IBet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bet);
    return this.http
      .put<IBet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findHistory(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBet[]>(`${this.resourceUrl}/history/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryBetGroup(req?: any): Observable<HttpResponse<IBetGroup[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBetGroup[]>(`${this.resourceUrl}/group-players`, { params: options, observe: 'response' });
  }

  filterBet(from: string, to: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBet[]>(`${this.resourceUrl}/search?from=${from}&to=${to}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(bet: IBet): IBet {
    const copy: IBet = Object.assign({}, bet, {
      betDate: bet.createdDate && bet.createdDate.isValid() ? bet.createdDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bet: IBet) => {
        bet.createdDate = bet.createdDate ? moment(bet.createdDate) : undefined;
      });
    }
    return res;
  }
}
