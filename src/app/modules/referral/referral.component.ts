import {Component, OnDestroy, OnInit} from '@angular/core';
import {IReferral} from '../../shared/model/referral.model';
import {Subscription} from 'rxjs';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {ReferralService} from './referral.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventManager} from '../../core/services';
import {NzModalService} from 'ng-zorro-antd';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { ReferralUpdateComponent } from './referral-update/referral-update.component';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit, OnDestroy {
  referrals?: IReferral[];
  eventSubscriber?: Subscription;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;

  constructor(
    protected referralService: ReferralService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInReferrals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReferral): number {
    return item.id!;
  }

  registerChangeInReferrals(): void {
    this.eventSubscriber = this.eventManager.subscribe('referralListModification', () => this.loadPage());
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.referralService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IReferral[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IReferral[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.referrals = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  editReferral(referral: IReferral) {
    const title = 'Update Referral';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: { top: '20px'},
      nzContent: ReferralUpdateComponent,
      nzComponentParams: { referral },
    });
  }
}
