import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from '../message/message.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {DeleteActionMessage, IDeleteActionMessage} from '../../shared/model/delete-message-by-action.model';

@Component({
  selector: 'app-delete-by-action',
  templateUrl: './delete-by-action.component.html',
  styleUrls: ['./delete-by-action.component.scss']
})
export class DeleteByActionComponent implements OnInit {
  public deleteMsgForm = this.fb.group({
    action: [null, [Validators.required]],
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
    this.subscribeToSaveResponse(this.messageService.deleteMsgByAction(msgForm));
  }

  private createMsgForm(): IDeleteActionMessage {
    return {
      ...new DeleteActionMessage(),
      action: this.deleteMsgForm.get(['action'])!.value
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
