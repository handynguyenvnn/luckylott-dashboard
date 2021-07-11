import { Component, OnInit } from '@angular/core';
import {IPlayer} from '../../../shared/model';
import {IReferral, Referral} from '../../../shared/model/referral.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ReferralService} from '../../referral/referral.service';
import {NzModalRef} from 'ng-zorro-antd';
import {EventManager} from '../../../core/services';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-update-ref-code',
  templateUrl: './update-ref-code.component.html',
  styleUrls: ['./update-ref-code.component.scss']
})
export class UpdateRefCodeComponent implements OnInit {
  isSaving: boolean;
  player?: IPlayer;
  referral: IReferral;

  updateReferralForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    teleId: [null],
  });

  constructor(
    protected referralService: ReferralService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) { }

  ngOnInit(): void {
    this.referralService.findByTeleId(this.player.teleId).subscribe(
      (data: HttpResponse<IReferral>) => {
        this.updateForm(data.body);
      });
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
      teleId: this.player.teleId,
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
