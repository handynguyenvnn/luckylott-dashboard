import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPlayerCredit} from '../../shared/model';
import {createRequestOption} from '../../shared/util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IPlayerCredit>;
type EntityArrayResponseType = HttpResponse<IPlayerCredit[]>;

@Injectable({ providedIn: 'root' })
export class PlayerCreditService {
  public resourceUrl = environment.SERVER_API_URL + 'api/player-credits';
  public resourceUrlPlayer = environment.SERVER_API_URL + 'api/players';

  constructor(protected http: HttpClient) {}

  create(playerCredit: IPlayerCredit): Observable<EntityResponseType> {
    return this.http.post<IPlayerCredit>(this.resourceUrl, playerCredit, { observe: 'response' });
  }

  update(playerCredit: IPlayerCredit): Observable<EntityResponseType> {
    return this.http.put<IPlayerCredit>(this.resourceUrl, playerCredit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlayerCredit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlayerCredit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryByPlayer(playerId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlayerCredit[]>(`${this.resourceUrlPlayer}/${playerId}/credits`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
