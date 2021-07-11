import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {IWithdrawal} from '../../shared/model';
import {Observable, Subscription} from 'rxjs';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawalService} from './withdrawal.service';
import {EventManager} from '../../core/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ReportMerchantsService } from '../report-merchants/report-merchants.service';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateWithdrawalComponent } from './update-withdrawal/update-withdrawal.component';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit, OnDestroy {
  isSaving = false;
  isSpinning = true;
  withdrawals?: IWithdrawal[];
  withdrawal?: IWithdrawal;
  public eventSubscriber?: Subscription;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  withdrawalsFilterForm: FormGroup;
  totalWithdrawals = 0;
  constructor(
    protected withdrawalService: WithdrawalService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private fb: FormBuilder,
    private reportMerchantsService: ReportMerchantsService,
    private modalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.withdrawalsFilterForm = this.fb.group({
      teleId: [],
      teleName: [],
      fromDate: [new Date()],
      toDate: [new Date()]
    });
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInWithdrawals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWithdrawal): number {
    return item.id!;
  }

  registerChangeInWithdrawals(): void {
    this.eventSubscriber = this.eventManager.subscribe('withdrawalListModification', () => this.loadPage());
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page?: number): void {
    const from = this.withdrawalsFilterForm.get(['fromDate'])!.value;
    const to = this.withdrawalsFilterForm.get(['toDate'])!.value;
    const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
    const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
    const teleId = this.withdrawalsFilterForm.get(['teleId'])!.value;
    const teleName = this.withdrawalsFilterForm.get(['teleName'])!.value;
    this.getWithdrawals(fromDate, toDate, teleId, teleName, page);
    this.getStats(fromDate, toDate);
  }

  getWithdrawals(fromDate: string, toDate: string, teleId: string, teleName: string, page?: number) {
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
    this.withdrawalService
    .query(params)
    .subscribe(
      (res: HttpResponse<IWithdrawal[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError(),
    );
  }

  protected onSuccess(data: IWithdrawal[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.withdrawals = [];
    if (data && data.length > 0) {
      data.forEach((e: IWithdrawal) => {
        if (e.withdrawalStatus === 'PENDING') {
          this.withdrawals.unshift(e);
        } else {
          this.withdrawals.push(e);
        }
      });
    }
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWithdrawal>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.loadPage();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  public doFilter() {
    this.loadPage();
  }

  getStats(fromDate: string, toDate: string) {
    const params: any = {};
    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }
    this.reportMerchantsService.getStats(params).subscribe(
      (rs: any) => {
        this.totalWithdrawals = rs.body.withdrawal || 0;
      }
    );
  }

  public buildWithdrawalModal(withdrawal: IWithdrawal, status: string): void {
    let title = 'Reject Withdrawal';
    if (status === 'APPROVED') {
      title = 'Approve Withdrawal';
    }
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: UpdateWithdrawalComponent,
      nzComponentParams: { withdrawal, status },
    });
  }
}
