import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {createRequestOption} from '../../shared/util';
import {IMessageInfo, MessageAction, MessageOut} from '../../shared/model';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IMessageInfo>;
type EntityArrayResponseType = HttpResponse<IMessageInfo[]>;

@Injectable({ providedIn: 'root' })
export class MessageInfoService {
  public resourceUrl = environment.SERVER_API_URL + 'api/telegram-message-infos';
  public resourceUrlTelegram = environment.SERVER_API_URL + 'api/telegram';

  constructor(protected http: HttpClient) {}

  create(messageInfo: IMessageInfo): Observable<EntityResponseType> {
    return this.http.post<IMessageInfo>(this.resourceUrl, messageInfo, { observe: 'response' });
  }

  deleteMsg(messageInfo: IMessageInfo): Observable<EntityResponseType> {
    const messageOut = new MessageOut(messageInfo.teleId, messageInfo.messageId);
    return this.http.post<IMessageInfo>(`${this.resourceUrlTelegram}/delete-message`, messageOut, { observe: 'response' });
  }

  deleteMesByAction(messageInfo: IMessageInfo): Observable<EntityResponseType> {
    const messageAction = new MessageAction(messageInfo.action);
    return this.http.put<IMessageInfo>(`${this.resourceUrlTelegram}/delete-message-by-action`, messageAction, { observe: 'response' });
  }

  update(messageInfo: IMessageInfo): Observable<EntityResponseType> {
    return this.http.put<IMessageInfo>(this.resourceUrl, messageInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMessageInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMessageInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
