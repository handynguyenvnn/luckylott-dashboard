import { Component, OnInit } from '@angular/core';
import { IReferral, Referral } from 'src/app/shared/model/referral.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ReferralService } from '../referral.service';
import { NzModalRef } from 'ng-zorro-antd';
import { EventManager } from 'src/app/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-referral-update',
  templateUrl: './referral-update.component.html',
  styleUrls: ['./referral-update.component.scss']
})
export class ReferralUpdateComponent implements OnInit {
  referral: IReferral;
  isSaving: boolean;
  updateReferralForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    teleId: [null, [Validators.required]],
  });

  constructor(
    protected referralService: ReferralService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) { }

  ngOnInit(): void {
    this.updateForm(this.referral);
  }

  save(): void {
    this.isSaving = true;
    const model = this.createReferralForm();
    this.subscribeToSaveResponse(this.referralService.update(model));
  }

  public updateForm(referral: IReferral): void {
    this.updateReferralForm.patchValue({
      id: referral.id,
      code: referral.code,
      teleId: referral.teleId
    });
  }

  private createReferralForm(): IReferral {
    return {
      ...new Referral(),
      id: this.updateReferralForm.get(['id'])!.value,
      code: this.updateReferralForm.get(['code'])!.value,
      teleId: this.updateReferralForm.get(['teleId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferral>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'referralListModification',
      content: 'Update to referral',
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
