import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReferral} from '../../shared/model/referral.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityResponseType = HttpResponse<IReferral>;
type EntityArrayResponseType = HttpResponse<IReferral[]>;

@Injectable({ providedIn: 'root' })
export class ReferralService {
  public resourceUrl = environment.SERVER_API_URL + 'api/referrals';
  public resourceUrlRef = environment.SERVER_API_URL + 'api/referrals-player';

  constructor(protected http: HttpClient) {}

  create(referral: IReferral): Observable<EntityResponseType> {
    return this.http.post<IReferral>(this.resourceUrl, referral, { observe: 'response' });
  }

  update(referral: IReferral): Observable<EntityResponseType> {
    return this.http.put<IReferral>(this.resourceUrl, referral, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReferral>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByTeleId(teleId: number): Observable<EntityResponseType> {
    return this.http.get<IReferral>(`${this.resourceUrlRef}/${teleId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReferral[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
