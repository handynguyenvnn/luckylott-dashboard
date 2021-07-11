import { Component, OnInit } from '@angular/core';
import {BetTypePrize, IBetType, IBetTypePrize} from '../../../shared/model';
import {FormBuilder, Validators} from '@angular/forms';
import {BetTypePrizeService} from '../bet-type-prize.service';
import {BetTypeService} from '../bet-type.service';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzModalRef} from 'ng-zorro-antd';
import {EventManager} from '../../../core/services';

@Component({
  selector: 'app-bet-type-prize-update',
  templateUrl: './bet-type-prize-update.component.html',
  styleUrls: ['./bet-type-prize-update.component.scss']
})
export class BetTypePrizeUpdateComponent implements OnInit {
  isSaving = false;
  betTypePrize: IBetTypePrize;
  bettypes: IBetType[] = [];

  editForm = this.fb.group({
    id: [],
    times: [null, [Validators.required]],
    prizeGame: [null, [Validators.required]],
    betTypeId: [null, Validators.required],
  });

  constructor(
    protected betTypePrizeService: BetTypePrizeService,
    protected betTypeService: BetTypeService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) {}

  ngOnInit(): void {
    this.betTypeService.query().subscribe((res: HttpResponse<IBetType[]>) => (this.bettypes = res.body || []));
    if (this.betTypePrize) {
      this.updateForm(this.betTypePrize);
    }
  }

  updateForm(betTypePrize: IBetTypePrize): void {
    this.editForm.patchValue({
      id: betTypePrize.id,
      times: betTypePrize.times,
      prizeGame: betTypePrize.prizeGame,
      betTypeId: betTypePrize.betTypeId,
    });
  }

  save(): void {
    this.isSaving = true;
    const betTypePrize = this.createFromForm();
    if (betTypePrize.id !== undefined) {
      this.subscribeToSaveResponse(this.betTypePrizeService.update(betTypePrize));
    } else {
      this.subscribeToSaveResponse(this.betTypePrizeService.create(betTypePrize));
    }
  }

  private createFromForm(): IBetTypePrize {
    return {
      ...new BetTypePrize(),
      id: this.editForm.get(['id'])!.value,
      times: this.editForm.get(['times'])!.value,
      prizeGame: this.editForm.get(['prizeGame'])!.value,
      betTypeId: this.editForm.get(['betTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBetTypePrize>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'betTypePrizeListModification',
      content: 'Update to prize',
    });
    this.modal.destroy();
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBetType): any {
    return item.id;
  }

  public destroyModal(): void {
    this.modal.destroy();
  }
}
