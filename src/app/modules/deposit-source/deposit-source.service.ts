import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPlayerCredit} from '../../shared/model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';

type EntityArrayResponseType = HttpResponse<IPlayerCredit[]>;

@Injectable({ providedIn: 'root' })
export class DepositSourceService {
  public resourceUrl = environment.SERVER_API_URL + 'api/player-credits';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlayerCredit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
