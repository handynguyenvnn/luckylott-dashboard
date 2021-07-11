import { Component, OnInit } from '@angular/core';
import {IPool} from '../../../shared/model/pool.model';
import {IPoolReward, PoolReward} from '../../../shared/model/pool-reward.model';
import {FormBuilder, Validators} from '@angular/forms';
import {PoolService} from '../pool.service';
import {EventManager} from '../../../core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ISettingPool, SettingPool} from '../../../shared/model/setting-pool.model';
import {SettingPoolService} from './setting-pool.service';

@Component({
  selector: 'app-setting-pool',
  templateUrl: './setting-pool.component.html',
  styleUrls: ['./setting-pool.component.scss']
})
export class SettingPoolComponent implements OnInit {
  isSaving: boolean;
  pool?: IPool;
  poolSettings?: ISettingPool[];
  settingForm = this.fb.group({
    id: [],
    settingValue: [null, [Validators.required]],
    settingKey: [null, [Validators.required]],
    poolId: [null, Validators.required],
  });

  constructor(
    private poolService: PoolService,
    private settingPoolService: SettingPoolService,
    private fb: FormBuilder,
    protected eventManager: EventManager,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.poolSettings = this.pool.settingPools;
  }

  public trackId(index: number, item: IPoolReward): number {
    return item.id;
  }

  updateForm(settingPool: ISettingPool): void {
    this.settingForm.patchValue({
      id: settingPool.id,
      settingValue: settingPool.settingValue,
      settingKey: settingPool.settingKey,
      poolId: settingPool.poolId,
    });
  }

  save(): void {
    this.isSaving = true;
    const poolSetting = this.createSettingForm();
    if (poolSetting.id) {
      this.subscribeToSaveResponse(this.settingPoolService.update(poolSetting));
    } else {
      this.subscribeToSaveResponse(this.settingPoolService.create(poolSetting));
    }
  }

  private createSettingForm(): ISettingPool {
    return {
      ...new SettingPool(),
      id: this.settingForm.get(['id'])!.value,
      settingValue: this.settingForm.get(['settingValue'])!.value,
      settingKey: this.settingForm.get(['settingKey'])!.value,
      poolId: this.pool.id,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISettingPool>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.poolService.findOne(this.pool.id).subscribe(
      (resp: HttpResponse<IPool>) => {
        this.poolSettings = resp.body.settingPools;
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
