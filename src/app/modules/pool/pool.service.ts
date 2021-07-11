import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {createRequestOption} from '../../shared/util';
import { IPool } from 'src/app/shared/model/pool.model';

type EntityResponseType = HttpResponse<IPool>;
type EntityArrayResponseType = HttpResponse<IPool[]>;

@Injectable({ providedIn: 'root' })
export class PoolService {
  public resourceUrl = environment.SERVER_API_URL + 'api/pools';

  public poolReward = environment.SERVER_API_URL + 'api/pool-rewards';

  constructor(protected http: HttpClient) {}

  create(pool: IPool): Observable<EntityResponseType> {
    return this.http.post<IPool>(this.resourceUrl, pool, { observe: 'response' });
  }

  update(pool: IPool): Observable<EntityResponseType> {
    return this.http.put<IPool>(this.resourceUrl, pool, { observe: 'response' });
  }

  findOne(id: number): Observable<EntityResponseType> {
    return this.http.get<IPool>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPool>(`${this.resourceUrl}/telegram/${id}`, { observe: 'response' });
  }

  getTokens() {
    return this.http.get(`${environment.SERVER_API_URL}api/tokens`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPool[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryById(poolId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPool[]>(`${this.resourceUrl}/${poolId}/pool-rewards`, { params: options, observe: 'response' });
  }

  queryNoPaging(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPool[]>(`${this.resourceUrl}/no-paging`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  queryPoolRewards(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPool[]>(this.poolReward, { params: options, observe: 'response' });
  }
  createPoolReward(pool: IPool): Observable<EntityResponseType> {
    return this.http.post<IPool>(this.poolReward, pool, { observe: 'response' });
  }

  updatePoolReward(pool: IPool): Observable<EntityResponseType> {
    return this.http.put<IPool>(this.poolReward, pool, { observe: 'response' });
  }
  deletePoolReward(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.poolReward}/${id}`, { observe: 'response' });
  }
}
