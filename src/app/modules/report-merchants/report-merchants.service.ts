import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReferral} from '../../shared/model/referral.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import { IAgentReport } from '../../../app/shared/model';

type EntityResponseType = HttpResponse<IAgentReport>;
type EntityArrayResponseType = HttpResponse<IAgentReport[]>;

@Injectable({ providedIn: 'root' })
export class ReportMerchantsService {
  public resourceUrl = environment.SERVER_API_URL + 'api/report/merchants';

  constructor(protected http: HttpClient) {}

  query(from: string, to: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let url;
    if (from && to) {
      url = `${this.resourceUrl}?from=${from}&to=${to}`;
    } else if (from) {
      url = `${this.resourceUrl}?from=${from}`;
    } else if (to) {
      url = `${this.resourceUrl}?to=${to}`;
    } else {
      url = this.resourceUrl;
    }
    return this.http.get<IAgentReport[]>(url, { params: options, observe: 'response' });
  }

  getStats(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgentReport[]>(environment.SERVER_API_URL + 'api/report', { params: options, observe: 'response' });
  }
}
