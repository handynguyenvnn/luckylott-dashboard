import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { IBetGroup } from 'src/app/shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants';
import { ReportBetsService } from './report-bets.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-report-bets',
  templateUrl: './report-bets.component.html',
  styleUrls: ['./report-bets.component.scss']
})
export class ReportBetsComponent implements OnInit {
  betGroups?: IBetGroup[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  search: any;
  betFilterForm: FormGroup;
  filter = false;
  constructor(
    protected reportBetsService: ReportBetsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.betFilterForm = this.fb.group({
      fromDate: [null],
      toDate: [null]
    });
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage(false);
    });
  }

  trackIdentity(index: number, item: IBetGroup): any {
    return item.teleId;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(filter: boolean, page?: number): void {
    const pageToLoad: number = page || this.page;
    const params: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      // sort: this.sort()
    };
    const from = this.betFilterForm.get(['fromDate'])!.value;
    const to = this.betFilterForm.get(['toDate'])!.value;
    if (from) {
      params.from = moment(from).format('YYYY/MM/DD');
    }
    if (to) {
      params.to = moment(to).format('YYYY/MM/DD');
    }

    this.reportBetsService.query(params).subscribe(
      (res: HttpResponse<IBetGroup[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError()
    );
  }

  protected onSuccess(data: IBetGroup[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.betGroups = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public doFilter() {
    this.filter = true;
    this.loadPage(this.filter);
  }
}
