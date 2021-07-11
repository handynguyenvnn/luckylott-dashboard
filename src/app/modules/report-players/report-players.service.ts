import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReferral} from '../../shared/model/referral.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import { IPlayerReport } from '../../shared/model';

type EntityResponseType = HttpResponse<IPlayerReport>;
type EntityArrayResponseType = HttpResponse<IPlayerReport[]>;

@Injectable({ providedIn: 'root' })
export class ReportPlayersService {
  public resourceUrl = environment.SERVER_API_URL + 'api/report/players';

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
    return this.http.get<IPlayerReport[]>(url, { params: options, observe: 'response' });
  }
}
