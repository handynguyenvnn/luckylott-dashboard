import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPoolReward} from '../../../shared/model/pool-reward.model';
import {createRequestOption} from '../../../shared/util';
import {environment} from '../../../../environments/environment';

type EntityResponseType = HttpResponse<IPoolReward>;
type EntityArrayResponseType = HttpResponse<IPoolReward[]>;

@Injectable({ providedIn: 'root' })
export class PoolRewardService {
  public resourceUrl = environment.SERVER_API_URL + 'api/pool-rewards';

  constructor(protected http: HttpClient) {}

  create(poolReward: IPoolReward): Observable<EntityResponseType> {
    return this.http.post<IPoolReward>(this.resourceUrl, poolReward, { observe: 'response' });
  }

  update(poolReward: IPoolReward): Observable<EntityResponseType> {
    return this.http.put<IPoolReward>(this.resourceUrl, poolReward, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPoolReward>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPoolReward[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
