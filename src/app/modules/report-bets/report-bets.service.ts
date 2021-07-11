import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import { IBetGroup } from 'src/app/shared/model';

type EntityResponseType = HttpResponse<IBetGroup>;
type EntityArrayResponseType = HttpResponse<IBetGroup[]>;

@Injectable({ providedIn: 'root' })
export class ReportBetsService {
  public resourceUrl = environment.SERVER_API_URL + 'api/bets';

  constructor(protected http: HttpClient) {}
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBetGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
