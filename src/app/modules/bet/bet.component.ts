import { Component, OnInit } from '@angular/core';
import {IBet, IBetGroup} from '../../shared/model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BetService} from './bet.service';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { ReportBetsService } from '../report-bets/report-bets.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {
  bets?: IBet[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  isSpinning = true;
  betFilterForm: FormGroup;
  filter = false;

  constructor(
    protected betService: BetService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.betFilterForm = this.fb.group({
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

  public trackId(index: number, item: IBetGroup): number {
    return item.teleId;
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
    const from = this.betFilterForm.get(['fromDate'])!.value;
    const to = this.betFilterForm.get(['toDate'])!.value;
    const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
    const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
    const teleId = this.betFilterForm.get(['teleId'])!.value;
    const teleName = this.betFilterForm.get(['teleName'])!.value;
    const params: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      timeZone: 7
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
    this.betService.query(params).subscribe(
      (res: HttpResponse<IBet[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError(),
    );
  }

  protected onSuccess(data: IBet[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.bets = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public doFilter() {
    this.loadPage();
  }
}
