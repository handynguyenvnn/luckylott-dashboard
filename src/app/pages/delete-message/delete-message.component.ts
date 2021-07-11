import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IMessage } from 'src/app/shared/model/message.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { IDeleteMessage, DeleteMessage } from 'src/app/shared/model/delete-message.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {
  public deleteMsgForm = this.fb.group({
    messageId: [null, [Validators.required]],
    teleId: [null, [Validators.required]],
  });
  isSaving = false;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
  }

  save() {
    this.isSaving = true;
    const msgForm = this.createMsgForm();
    this.subscribeToSaveResponse(this.messageService.deleteMsg(msgForm));
  }

  private createMsgForm(): IDeleteMessage {
    return {
      ...new DeleteMessage(),
      messageId: this.deleteMsgForm.get(['messageId'])!.value,
      teleId: this.deleteMsgForm.get(['teleId'])!.value
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
