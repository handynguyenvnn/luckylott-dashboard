import { Component, OnInit } from '@angular/core';
import {AgentPwd} from '../../../shared/model/agent-pwd.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd';
import {PasswordService} from '../../account/pages/password/password.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-agent-update-pwd',
  templateUrl: './agent-update-pwd.component.html',
  styleUrls: ['./agent-update-pwd.component.scss']
})
export class AgentUpdatePwdComponent {
  login?: string;
  isSaving = false;
  agentPdwForm = this.fb.group({
    newPassword: [null, [Validators.required]]
  });
  public changePwdError: boolean;
  constructor(
    private passwordService: PasswordService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modal: NzModalRef,
  ) {}

  changePassword(): void {
    this.passwordService.agentChangePwd(this.login, this.agentPdwForm.get(['newPassword'])!.value).subscribe(
      () => {
        this.isSaving = true;
        this.changePwdError = false;
        this.destroyModal();
      },
      (err: HttpErrorResponse) => {
        this.isSaving = false;
        this.changePwdError = true;
      }
    );
  }

  public destroyModal(): void {
    this.modal.destroy();
    this.modal.close();
  }
}
