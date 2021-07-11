import {Component, OnDestroy, OnInit} from '@angular/core';
import {BetTypePrizeService} from './bet-type-prize.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {Subscription} from 'rxjs';
import {EventManager} from '../../core/services';
import {NzModalService} from 'ng-zorro-antd';
import {IBetTypePrize} from '../../shared/model';
import {IReferral} from '../../shared/model/referral.model';
import {ReferralUpdateComponent} from '../../modules/referral/referral-update/referral-update.component';
import {BetTypePrizeUpdateComponent} from './bet-type-prize-update/bet-type-prize-update.component';

@Component({
  selector: 'app-prize-setting',
  templateUrl: './prize-setting.component.html',
  styleUrls: ['./prize-setting.component.scss']
})
export class PrizeSettingComponent implements OnInit, OnDestroy {
  betTypePrizes?: IBetTypePrize[];
  public eventSubscriber?: Subscription;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  isSpinning = true;

  constructor(
    protected betTypePrizeService: BetTypePrizeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private modalService: NzModalService,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInBetTypePrizes();
  }

  public trackId(index: number, item: IBetTypePrize): number {
    return item.id;
  }

  registerChangeInBetTypePrizes(): void {
    this.eventSubscriber = this.eventManager.subscribe('betTypePrizeListModification', () => this.loadPage());
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.betTypePrizeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IBetTypePrize[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IBetTypePrize[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.betTypePrizes = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  editPrize(betTypePrize: IBetTypePrize) {
    const title = 'Update Bet Type Prize';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: { top: '20px'},
      nzContent: BetTypePrizeUpdateComponent,
      nzComponentParams: { betTypePrize },
    });
  }
}
