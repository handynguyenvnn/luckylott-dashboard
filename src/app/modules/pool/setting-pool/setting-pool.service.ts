import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ISettingPool} from '../../../shared/model/setting-pool.model';
import {createRequestOption} from '../../../shared/util';
import {environment} from '../../../../environments/environment';

type EntityResponseType = HttpResponse<ISettingPool>;
type EntityArrayResponseType = HttpResponse<ISettingPool[]>;

@Injectable({ providedIn: 'root' })
export class SettingPoolService {
  public resourceUrl = environment.SERVER_API_URL + 'api/setting-pools';

  constructor(protected http: HttpClient) {}

  create(settingPool: ISettingPool): Observable<EntityResponseType> {
    return this.http.post<ISettingPool>(this.resourceUrl, settingPool, { observe: 'response' });
  }

  update(settingPool: ISettingPool): Observable<EntityResponseType> {
    return this.http.put<ISettingPool>(this.resourceUrl, settingPool, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISettingPool>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISettingPool[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
