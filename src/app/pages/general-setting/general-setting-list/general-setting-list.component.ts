import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {EventManager} from '../../../core/services';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ISetting} from 'src/app/shared/model';
import {GeneralSettingService} from '../setting.service';

@Component({
  selector: 'app-general-setting-list',
  templateUrl: './general-setting-list.component.html',
  styleUrls: ['./general-setting-list.component.scss']
})
export class GeneralSettingListComponent implements OnInit, OnDestroy {
  settings?: ISetting[];
  eventSubscriber?: Subscription;

  // Seting variable
  externalApiKey: any;
  externalPlayerEndpoint: any;
  externalAddressEndpoint: any;
  externalBetEndpoint: any;
  externalWithdrawalEndpoint: any;
  telegramBotToken: any;
  externalRefCodeEndpoint: any;

  constructor(
    protected generalSettingService: GeneralSettingService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private notification: NzNotificationService
  ) {}

  loadPage(): void {
    this.generalSettingService
      .query({
        sort: ['id,asc']
      })
      .subscribe(
        (res: HttpResponse<ISetting[]>) => this.onSuccess(res.body),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.loadPage();
    this.registerChangeInSettings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISetting): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id;
  }

  registerChangeInSettings(): void {
    this.eventSubscriber = this.eventManager.subscribe('settingListModification', () => this.loadPage());
  }

  protected onSuccess(data: ISetting[]): void {
    this.settings = data || [];
    data.forEach((item) => {
      switch (item.settingKey) {
        case 'EXTERNAL_API_KEY':
          this.externalApiKey = item.settingValue;
          break;
        case 'EXTERNAL_REGISTER_PLAYER_ENDPOINT':
          this.externalPlayerEndpoint = item.settingValue;
          break;
        case 'EXTERNAL_REGISTER_ADDRESS_ENDPOINT':
          this.externalAddressEndpoint = item.settingValue;
          break;
        case 'EXTERNAL_TRACKING_BET_ENDPOINT':
          this.externalBetEndpoint = item.settingValue;
          break;
        case 'EXTERNAL_TRACKING_WITHDRAWAL_ENDPOINT':
          this.externalWithdrawalEndpoint = item.settingValue;
          break;
        case 'TELEGRAM_BOT_TOKEN':
          this.telegramBotToken = item.settingValue;
          break;
        case 'EXTERNAL_SET_REF_CODE_ENDPOINT':
          this.externalRefCodeEndpoint = item.settingValue;
          break;
      }
    });
  }

  protected onError(): void {
    this.notification.create(
      'error',
      'Error',
      'Error incurred. Please try again!'
    );
  }

  save() {
    const updateItem = [];
    this.settings.forEach((e, index) => {
      if (e.settingKey === 'EXTERNAL_API_KEY' && e.settingValue !== this.externalApiKey) {
        e.settingValue = this.externalApiKey;
        updateItem.push(e);
      }

      if (e.settingKey ===  'EXTERNAL_REGISTER_PLAYER_ENDPOINT' && e.settingValue !== this.externalPlayerEndpoint) {
        e.settingValue = this.externalPlayerEndpoint;
        updateItem.push(e);
      }

      if (e.settingKey ===  'EXTERNAL_REGISTER_ADDRESS_ENDPOINT' && e.settingValue !== this.externalAddressEndpoint) {
        e.settingValue = this.externalAddressEndpoint;
        updateItem.push(e);
      }

      if (e.settingKey === 'EXTERNAL_TRACKING_BET_ENDPOINT' && e.settingValue !== this.externalBetEndpoint) {
        e.settingValue = this.externalBetEndpoint;
        updateItem.push(e);
      }

      if (e.settingKey ===  'EXTERNAL_TRACKING_WITHDRAWAL_ENDPOINT' && e.settingValue !== this.externalWithdrawalEndpoint) {
        e.settingValue = this.externalWithdrawalEndpoint;
        updateItem.push(e);
      }

      if (e.settingKey ===  'TELEGRAM_BOT_TOKEN' && e.settingValue !== this.telegramBotToken) {
        e.settingValue = this.telegramBotToken;
        updateItem.push(e);
      }

      if (e.settingKey ===  'EXTERNAL_SET_REF_CODE_ENDPOINT' && e.settingValue !== this.externalRefCodeEndpoint) {
        e.settingValue = this.externalRefCodeEndpoint;
        updateItem.push(e);
      }
    });

    updateItem.forEach((e, index) => {
      this.saveItemSetting(e, index, updateItem.length - 1);
    });
  }

  saveItemSetting(setting: ISetting, index: number, finishIndex: number) {
    this.generalSettingService
      .update(setting)
      .subscribe(
        (res: HttpResponse<ISetting>) => {
          if (index === finishIndex) {
            this.notification.create(
              'success',
              'Done',
              'Successfully saved!'
            );
          }
        },
        () => this.onError()
      );
  }
}
