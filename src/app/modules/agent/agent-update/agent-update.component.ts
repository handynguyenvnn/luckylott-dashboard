import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AgentService} from '../agent.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzModalRef} from 'ng-zorro-antd';
import {EventManager} from '../../../../app/core';
import {AGENT_CODE_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from '../../../shared/constants';
import {Agent, IAgent} from '../../../shared/model';
import {AgentStatusEnum} from '../../../shared/model/enumerations/agent-status-enum.model';

@Component({
  selector: 'app-agent-update',
  templateUrl: './agent-update.component.html',
  styleUrls: ['./agent-update.component.scss']
})
export class AgentUpdateComponent implements OnInit {
  error = false;
  errorAgentExists = false;
  errorUserExists = false;
  agent?: IAgent;
  public btnLabel = 'Save';
  isSaving = false;
  status: string;
  agentForm = this.fb.group({
    id: [],
    userLogin: [null, [Validators.required]],
    password: [null, [Validators.required]],
    name: [],
    code: [null, [Validators.required]],
    commission: [null, [Validators.required]],
    merchantStatus: [AgentStatusEnum.OPEN, [Validators.required]]
  });

  constructor(
    protected merchantService: AgentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) {}

  ngOnInit(): void {
    if (this.agent) {
      this.btnLabel = 'Update';
      this.status = this.agent.merchantStatus;
      this.updateForm(this.agent);
    }
  }

  updateForm(merchant: IAgent): void {
    this.agentForm.get('password').clearValidators();
    this.agentForm.patchValue({
      id: merchant.id,
      name: merchant.name,
      code: merchant.code,
      commission: merchant.commission,
      merchantStatus: merchant.merchantStatus,
      userId: merchant.userId,
      userLogin: merchant.userLogin,
    });
  }

  public save(): void {
    this.isSaving = true;
    const agent = this.createAgentForm();
    if (agent.id) {
      this.subscribeToSaveResponse(this.merchantService.update(agent));
    } else {
      this.subscribeToSaveResponse(this.merchantService.createAgent(agent));
    }
  }

  private createAgentForm(): IAgent {
    return {
      ...new Agent(),
      id: this.agentForm.get(['id'])!.value,
      name: this.agentForm.get(['name'])!.value,
      code: this.agentForm.get(['code'])!.value,
      commission: this.agentForm.get(['commission'])!.value,
      merchantStatus: AgentStatusEnum.OPEN,
      userLogin: this.agentForm.get(['userLogin'])!.value,
      password: this.agentForm.get(['password'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (err: HttpErrorResponse) => this.onSaveError(err),
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'agentListModification',
      content: 'Changing an agent',
    });
    this.isSaving = false;
    this.destroyModal();
  }

  public destroyModal(): void {
    this.modal.destroy();
    this.modal.close();
  }

  private onSaveError(response: HttpErrorResponse): void {
    this.isSaving = false;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === AGENT_CODE_ALREADY_USED_TYPE) {
      this.errorAgentExists = true;
    } else {
      this.error = true;
    }
  }
}
