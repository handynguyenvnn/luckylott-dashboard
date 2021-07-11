import { Component, OnInit } from '@angular/core';
import {MessageService} from './message.service';
import {FormBuilder, Validators} from '@angular/forms';
import {IMessage, Message} from '../../shared/model/message.model';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {UploadFile, NzNotificationService} from 'ng-zorro-antd';
import {AuthServerProvider} from '../../core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  public isSaving = false;
  public tokenAuth: string;
  public apiUpload: string;
  fileList: UploadFile[] = [];
  public sendMsgForm = this.fb.group({
    ids: [],
    message: []
  });

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private authServerProvider: AuthServerProvider,
    private notification: NzNotificationService
  ) { }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  removeUpload = (file: UploadFile): boolean => {
    const index = this.fileList.findIndex((x) => x.uid === file.uid);
    if (index !== -1) {
      this.fileList.splice(index, 1);
    }
    return false;
  }

  ngOnInit() {
    this.tokenAuth = 'Bearer ' + this.authServerProvider.getToken();
    this.apiUpload = environment.SERVER_API_URL + 'api/send-message';
  }

  handleUpload() {
    this.isSaving = true;
    const msgForm = this.createMsgForm();
    const file = this.fileList[0];
    if (msgForm.ids) {
      this.subscribeToSaveResponse(this.messageService.sendMsgToUser(msgForm.ids, msgForm.message, this.fileList[0]));
    } else {
      this.subscribeToSaveResponse(this.messageService.sendMsgToUsers(msgForm.message, this.fileList[0]));
    }
  }

  private createMsgForm(): IMessage {
    return {
      ...new Message(),
      ids: this.sendMsgForm.get(['ids'])!.value,
      message: this.sendMsgForm.get(['message'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError(),
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.fileList = [];
    this.notification.create(
      'success',
      'Done',
      'Successfully!'
    );
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.notification.create(
      'error',
      'Error',
      'Error incurred. Please try again!'
    );
  }
}
