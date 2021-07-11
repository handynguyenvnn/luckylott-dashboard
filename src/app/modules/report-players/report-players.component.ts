import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { IPlayerReport } from 'src/app/shared/model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants';
import { ReportPlayersService } from './report-players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-report-players',
  templateUrl: './report-players.component.html',
  styleUrls: ['./report-players.component.scss']
})
export class ReportPlayersComponent implements OnInit {
  public reportPlayers?: IPlayerReport[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  isSpinning = true;
  playerFilterForm: FormGroup;
  filter = false;
  constructor(
    private reportPlayersService: ReportPlayersService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.playerFilterForm = this.fb.group({
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

  public trackId(index: number, item: IPlayerReport): number {
    return item.id;
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
    let subcription = this.reportPlayersService.query(null, null, {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    });
    if (fillter) {
      const from = this.playerFilterForm.get(['fromDate'])!.value;
      const to = this.playerFilterForm.get(['toDate'])!.value;
      const fromDate = from ? moment(from).format('YYYY/MM/DD') : null;
      const toDate = to ? moment(to).format('YYYY/MM/DD') : null;
      subcription = this.reportPlayersService.query(fromDate, toDate, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      });
    }

    subcription.subscribe(
      (res: HttpResponse<IPlayerReport[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
      () => this.onError()
    );
  }

  protected onSuccess(data: IPlayerReport[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.reportPlayers = data || [];
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
