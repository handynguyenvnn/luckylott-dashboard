import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWalletAddress } from '../../../app/shared/model';
import { environment } from '../../../environments/environment';
import { createRequestOption } from '../../../app/shared/util';

type EntityResponseType = HttpResponse<IWalletAddress>;
type EntityArrayResponseType = HttpResponse<IWalletAddress[]>;

@Injectable({ providedIn: 'root' })
export class WalletAddressService {
  public resourceUrl = environment.SERVER_API_URL + 'api/wallet-addresses';

  constructor(protected http: HttpClient) {}

  create(walletAddress: IWalletAddress): Observable<EntityResponseType> {
    return this.http.post<IWalletAddress>(this.resourceUrl, walletAddress, { observe: 'response' });
  }

  update(walletAddress: IWalletAddress): Observable<EntityResponseType> {
    return this.http.put<IWalletAddress>(this.resourceUrl, walletAddress, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWalletAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWalletAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
