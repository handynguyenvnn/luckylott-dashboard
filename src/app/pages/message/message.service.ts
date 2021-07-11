import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { IDeleteMessage } from 'src/app/shared/model/delete-message.model';
import {IDeleteActionMessage} from '../../shared/model/delete-message-by-action.model';

type EntityResponseType = HttpResponse<any>;

@Injectable({ providedIn: 'root' })
export class MessageService {
  public resourceUrl = environment.SERVER_API_URL + 'api/admin/telegram';

  constructor(protected http: HttpClient) {}

  sendMsgToUsers(msg: string, photo: any): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    let path = `${this.resourceUrl}/send-message-users`;
    if (msg) {
      path = `${this.resourceUrl}/send-message-users?message=${msg}`;
    }
    return this.http.post<any>(path, formData, { headers });
  }

  sendMsgToUser(ids: string, msg: string, photo: any): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    let path = `${this.resourceUrl}/send-message?ids=${ids}`;
    if (msg) {
      path = `${this.resourceUrl}/send-message?ids=${ids}&message=${msg}`;
    }
    return this.http.post<any>(path, formData, { headers });
  }

  deleteMsg(model: IDeleteMessage): Observable<any> {
    return this.http.put<any>(`${this.resourceUrl}/delete-message`, model);
  }

  deleteMsgByAction(actionMsg: IDeleteActionMessage): Observable<any> {
    return this.http.put<any>(`${this.resourceUrl}/delete-message-by-action`, actionMsg);
  }
}
