import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EventManager } from 'src/app/core';
import { PoolService } from 'src/app/modules/pool/pool.service';
import {IPool} from '../../../shared/model/pool.model';
import {IPoolReward, PoolReward} from '../../../shared/model/pool-reward.model';
import {PoolRewardService} from './pool-reward.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-pool-reward-update',
  templateUrl: './pool-reward-update.component.html',
  styleUrls: ['./pool-reward.component.scss']
})
export class PoolRewardUpdateComponent implements OnInit {
  isSaving: boolean;
  pool?: IPool;
  poolRewards?: IPoolReward[];
  rewardForm = this.fb.group({
    id: [],
    betType: [0, [Validators.required]],
    equalSharePercent: [0, [Validators.required]],
    times: [null, [Validators.required]],
    poolId: [null, [Validators.required]],
  });

  constructor(
    private poolService: PoolService,
    private poolRewardService: PoolRewardService,
    private fb: FormBuilder,
    protected eventManager: EventManager,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.poolRewards = this.pool.poolRewards;
  }

  public trackId(index: number, item: IPoolReward): number {
    return item.id;
  }

  updateForm(poolReward: IPoolReward): void {
    this.rewardForm.patchValue({
      id: poolReward.id,
      times: poolReward.times,
      betType: poolReward.betType,
      equalSharePercent: poolReward.equalSharePercent,
      poolId: poolReward.poolId,
    });
  }

  save(): void {
    this.isSaving = true;
    const poolReward = this.createRewardForm();
    if (poolReward.id) {
      this.subscribeToSaveResponse(this.poolRewardService.update(poolReward));
    }
  }

  private createRewardForm(): IPoolReward {
    return {
      ...new PoolReward(),
      id: this.rewardForm.get(['id'])!.value,
      times: this.rewardForm.get(['times'])!.value,
      betType: this.rewardForm.get(['betType'])!.value,
      equalSharePercent: this.rewardForm.get(['equalSharePercent'])!.value,
      poolId: this.pool.id,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPoolReward>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.poolService.findOne(this.pool.id).subscribe(
      (resp: HttpResponse<IPool>) => {
        this.poolRewards = resp.body.poolRewards;
        this.notification.create(
          'success',
          'Done',
          'Successfully saved!'
        );
      },
      (err: HttpErrorResponse) => this.onSaveError()
    );
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
