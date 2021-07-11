import { Component, OnInit } from '@angular/core';
import {IDeposit, IPlayerCredit} from '../../shared/model';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {DepositService} from '../deposit/deposit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {DepositSourceService} from './deposit-source.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ReportMerchantsService } from '../report-merchants/report-merchants.service';
@Component({
  selector: 'app-deposit-source',
  templateUrl: './deposit-source.component.html',
  styleUrls: ['./deposit-source.component.scss']
})
export class DepositSourceComponent implements OnInit {
  isSpinning = true;
  playerCredits: IPlayerCredit[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  depositFilterForm: FormGroup;
  totalDeposits = 0;
  constructor(
    protected depositSourceService: DepositSourceService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder,
    private reportMerchantsService: ReportMerchantsService
  ) {}

  public ngOnInit(): void {
    this.depositFilterForm = this.fb.group({
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
  }

  public trackId(index: number, item: IDeposit): number {
    return item.id;
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page?: number): void {
    const from = this.depositFilterForm.get(['fromDate'])!.value;
    const to = this.depositFilterForm.get(['toDate'])!.value;
    const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
    const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
    const teleId = this.depositFilterForm.get(['teleId'])!.value;
    const teleName = this.depositFilterForm.get(['teleName'])!.value;
    this.getDeposits(fromDate, toDate, teleId, teleName, page);
    this.getStats(fromDate, toDate);
  }

  getDeposits(fromDate: string, toDate: string, teleId: string, teleName: string, page?: number) {
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
    this.depositSourceService
    .query(params)
    .subscribe(
      (res: HttpResponse<IPlayerCredit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError(),
    );
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
        this.totalDeposits = rs.body.deposit || 0;
      }
    );
  }

  protected onSuccess(data: IDeposit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.playerCredits = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public doFilter() {
    this.loadPage();
  }
}
