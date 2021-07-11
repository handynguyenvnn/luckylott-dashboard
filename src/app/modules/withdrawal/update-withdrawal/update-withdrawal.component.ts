import { Component, OnInit } from '@angular/core';
import { IWithdrawal } from 'src/app/shared/model';
import { Validators, FormBuilder } from '@angular/forms';
import { WithdrawalService } from '../withdrawal.service';
import { NzModalRef } from 'ng-zorro-antd';
import { EventManager } from 'src/app/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from 'src/app/pages/message/message.service';

@Component({
  selector: 'app-update-withdrawal',
  templateUrl: './update-withdrawal.component.html',
  styleUrls: ['./update-withdrawal.component.scss']
})
export class UpdateWithdrawalComponent implements OnInit {
  withdrawal: IWithdrawal;
  status: any;
  isSaving: boolean;
  updateWithdrawalForm = this.fb.group({
    note: ['']
  });

  constructor(
    protected withdrawalService: WithdrawalService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {}

  save(): void {
    this.isSaving = true;
    this.withdrawal.withdrawalStatus = this.status;
    this.withdrawal.note = this.updateWithdrawalForm.get(['note'])!.value;
    this.subscribeToSaveResponse(this.withdrawalService.update(this.withdrawal));
    this.sendMessageToTele(this.withdrawal.teleId, this.withdrawal.note);
  }

  sendMessageToTele(teleId, message) {
    this.messageService.sendMsgToUser(teleId, message, null).subscribe();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithdrawal>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'withdrawalListModification',
      content: 'Update to withdrawal',
    });
    this.modal.destroy();
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  public destroyModal(): void {
    this.modal.destroy();
  }
}
