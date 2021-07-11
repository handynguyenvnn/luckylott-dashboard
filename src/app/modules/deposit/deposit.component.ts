import { Component, OnInit } from '@angular/core';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {IBet, IDeposit} from '../../shared/model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {DepositService} from './deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  isSpinning = true;
  deposits: IDeposit[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;

  constructor(
    protected depositService: DepositService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  public ngOnInit(): void {
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
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.depositService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IDeposit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IDeposit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.deposits = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
