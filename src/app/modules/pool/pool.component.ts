import {Component, OnDestroy, OnInit} from '@angular/core';
import { PoolService } from './pool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import {EventManager} from '../../core/services';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {Subscription} from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { IPool, Pool } from 'src/app/shared/model/pool.model';
import { PoolUpdateComponent } from 'src/app/modules/pool/pool-update/pool-update.component';
import { ManageComponent } from 'src/app/shared/abstract/manage.component';
import {PoolRewardUpdateComponent} from './pool-reward-update/pool-reward-update.component';
import {SettingPoolComponent} from './setting-pool/setting-pool.component';
@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent  extends ManageComponent implements OnInit, OnDestroy {
  public pools?: IPool[];
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

  public trackId(index: number, item: IPool): number {
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
    .query(params)
    .subscribe(
      (res: HttpResponse<IPool[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
      (response: HttpResponse<IPool>) => {
        this.pools.push(response.body);
        this.totalItems = 1;
      });
  }
  create() {
    const title = 'Pool Information';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: PoolUpdateComponent,
      nzComponentParams: { pool: new Pool() },
      nzFooter: null
    });
  }
  updatePool(pool?: IPool) {
    const title = 'Pool Information';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: PoolUpdateComponent,
      nzComponentParams: { pool },
      nzFooter: null
    });
  }
  confirmDelete(id) {
    this.poolService.delete(id)
    .subscribe(() => {
      this.notification.create(
        'success',
        'Delete',
        'Delete pool successfully!'
      );
      this.loadAll();
    });
  }
  public doFilter() {
    this.loadPage();
  }

  public buildRewardModal(pool?: IPool): void {
    const title = 'Pool reward';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: PoolRewardUpdateComponent,
      nzComponentParams: { pool },
    });
  }

  public buildSettingModal(pool?: IPool): void {
    const title = 'Pool Setting';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: SettingPoolComponent,
      nzComponentParams: { pool },
    });
  }
}
