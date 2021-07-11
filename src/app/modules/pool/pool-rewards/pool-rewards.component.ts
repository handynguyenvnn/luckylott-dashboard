import {Component, OnDestroy, OnInit} from '@angular/core';
import { PoolService } from '../pool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import {EventManager} from '../../../core/services';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ITEMS_PER_PAGE} from '../../../shared/constants';
import {Subscription} from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { PoolRewardUpdateComponent } from 'src/app/modules/pool/pool-reward-update/pool-reward-update.component';
import { ManageComponent } from 'src/app/shared/abstract/manage.component';
import { IPoolReward, PoolReward } from 'src/app/shared/model/pool-reward.model';
@Component({
  selector: 'app-pool-rewards',
  templateUrl: './pool-rewards.component.html',
  styleUrls: ['./pool-rewards.component.scss']
})
export class PoolRewardsComponent  extends ManageComponent implements OnInit, OnDestroy {
  public pools?: IPoolReward[];
  isSpinning = true;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  eventSubscriber?: Subscription;
  poolFilterForm: FormGroup;
  totalPools = 0;
  constructor(
    private poolService: PoolService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public eventManager: EventManager,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) {
    super(eventManager);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.poolFilterForm = this.fb.group({
      teleId: [],
      teleName: [],
      fromDate: [],
      toDate: []
    });
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInPools();
    this.registerChangeInReferrals();
  }

  public trackId(index: number, item: IPoolReward): number {
    return item.id;
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadAll(): void {
    const from = this.poolFilterForm.get(['fromDate'])!.value;
    const to = this.poolFilterForm.get(['toDate'])!.value;
    const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
    const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
    const teleId = this.poolFilterForm.get(['teleId'])!.value;
    const teleName = this.poolFilterForm.get(['teleName'])!.value;
    this.getPools(fromDate, toDate, teleId, teleName, this.queryParams.page);
  }

  getPools(fromDate: string, toDate: string, teleId: string, teleName: string, page?: number) {
    const pageToLoad: number = page || this.page;
    const params: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }
    if (teleId) {
      params.teleId = teleId;
    }
    if (teleName) {
      params.teleName = teleName;
    }
    this.poolService
    .queryPoolRewards(params)
    .subscribe(
      (res: HttpResponse<IPoolReward[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError(),
    );
  }

  registerChangeInPools(): void {
    this.subscriptions.push(this.eventManager.subscribe('poolListModification', () => this.loadPage()));
  }

  registerChangeInReferrals(): void {
    this.subscriptions.push(this.eventSubscriber = this.eventManager.subscribe('referralListModification', () => this.loadPage()));
  }

  searchPool(inputValue: any) {
    this.pools = [];
    this.poolService.find(+inputValue).subscribe(
      (response: HttpResponse<IPoolReward>) => {
        this.pools.push(response.body);
        this.totalItems = 1;
      });
  }
  create() {

  }
  updatePool(poolReward?: IPoolReward) {

  }
  confirmDelete(id) {
    this.poolService.deletePoolReward(id)
    .subscribe(() => {
      this.notification.create(
        'success',
        'Delete',
        'Delete pool reward successfully!'
      );
      this.loadAll();
    })
  }
  public doFilter() {
    this.loadPage();
  }
}
