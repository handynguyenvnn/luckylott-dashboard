import { Component, OnInit } from '@angular/core';
import { IAgentReport } from 'src/app/shared/model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ReportMerchantsService } from './report-merchants.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-report-merchants',
  templateUrl: './report-merchants.component.html',
  styleUrls: ['./report-merchants.component.scss']
})
export class ReportMerchantsComponent implements OnInit {
  public reportAgents?: IAgentReport[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  isSpinning = true;
  merchantFilterForm: FormGroup;
  filter = false;
  constructor(
    private reportMerchantsService: ReportMerchantsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.merchantFilterForm = this.fb.group({
      fromDate: [null],
      toDate: [null]
    });
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage(false);
    });
  }

  public trackId(index: number, item: IAgentReport): number {
    return item.merchant.id;
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(fillter, page?: number): void {
    const pageToLoad: number = page || this.page;
    let subcription = this.reportMerchantsService.query(null, null, {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    });
    if (fillter) {
      const from = this.merchantFilterForm.get(['fromDate'])!.value;
      const to = this.merchantFilterForm.get(['toDate'])!.value;
      const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
      const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
      subcription = this.reportMerchantsService.query(fromDate, toDate, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      });
    }

    subcription.subscribe(
      (res: HttpResponse<IAgentReport[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError()
    );
  }

  protected onSuccess(data: IAgentReport[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.reportAgents = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public doFilter() {
    this.filter = true;
    this.loadPage(this.filter);
  }
}
