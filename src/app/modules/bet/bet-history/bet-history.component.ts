import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BetService } from '../bet.service';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants';
import { IBet } from 'src/app/shared/model';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {
  teleId: string;
  bets?: IBet[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  isSpinning = true;

  constructor(
    protected betService: BetService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  public ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.teleId = id;
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
  }

  public trackId(index: number, item: IBet): string {
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
    const params: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.betService.findHistory(this.teleId, params).subscribe(
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
}
