import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IWithdrawal} from '../../shared/model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityResponseType = HttpResponse<IWithdrawal>;
type EntityArrayResponseType = HttpResponse<IWithdrawal[]>;

@Injectable({ providedIn: 'root' })
export class WithdrawalService {
  public resourceUrl = environment.SERVER_API_URL + 'api/withdrawals';

  constructor(protected http: HttpClient) {}

  create(withdrawal: IWithdrawal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(withdrawal);
    return this.http
      .post<IWithdrawal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(withdrawal: IWithdrawal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(withdrawal);
    return this.http
      .put<IWithdrawal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWithdrawal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWithdrawal[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(withdrawal: IWithdrawal): IWithdrawal {
    const copy: IWithdrawal = Object.assign({}, withdrawal, {
      submitDate: withdrawal.submitDate && withdrawal.submitDate.isValid() ? withdrawal.submitDate.toJSON() : undefined,
      actionDate: withdrawal.actionDate && withdrawal.actionDate.isValid() ? withdrawal.actionDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.submitDate = res.body.submitDate ? moment(res.body.submitDate) : undefined;
      res.body.actionDate = res.body.actionDate ? moment(res.body.actionDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((withdrawal: IWithdrawal) => {
        withdrawal.submitDate = withdrawal.submitDate ? moment(withdrawal.submitDate) : undefined;
        withdrawal.actionDate = withdrawal.actionDate ? moment(withdrawal.actionDate) : undefined;
      });
    }
    return res;
  }
}
