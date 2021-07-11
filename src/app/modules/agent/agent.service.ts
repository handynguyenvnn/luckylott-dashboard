import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import {IAgent, IAgentPlayer, IAgentReport, IPlayer} from '../../shared/model';

type EntityResponseType = HttpResponse<IAgent>;
type EntityArrayResponseType = HttpResponse<IAgent[]>;

@Injectable({ providedIn: 'root' })
export class AgentService {
  public resourceUrl = environment.SERVER_API_URL + 'api/merchants';
  public resourceUrlAgent = environment.SERVER_API_URL + 'api/agent';

  constructor(protected http: HttpClient) {}

  create(merchant: IAgent): Observable<EntityResponseType> {
    return this.http.post<IAgent>(this.resourceUrl, merchant, { observe: 'response' });
  }

  createAgent(merchant: IAgent): Observable<EntityResponseType> {
    return this.http.post<IAgent>(this.resourceUrlAgent, merchant, { observe: 'response' });
  }

  update(merchant: IAgent): Observable<EntityResponseType> {
    return this.http.put<IAgent>(this.resourceUrl, merchant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByUser(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgent>(`${this.resourceUrl}/user/${id}`, { observe: 'response' });
  }

  findAgentInfo(id: number): Observable<HttpResponse<IAgentReport>> {
    return this.http.get<IAgentReport>(`${this.resourceUrl}/${id}/report`,
      { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryAgentPlayer(id: number, req?: any): Observable<HttpResponse<IAgentPlayer[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAgentPlayer[]>(`${this.resourceUrl}/${id}/players`, { params: options, observe: 'response' });
  }

  queryAgentPlayerReport(id: number, req?: any): Observable<HttpResponse<IAgentPlayer[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAgentPlayer[]>(`${this.resourceUrl}/${id}/bet-players`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
