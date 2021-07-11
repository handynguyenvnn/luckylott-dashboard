import {Component, OnDestroy, OnInit} from '@angular/core';
import { PlayerService } from './player.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {EventManager} from '../../core/services';
import {IGame, IPlayer} from '../../shared/model';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public players?: IPlayer[];
  public eventSubscriber?: Subscription;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  isSpinning = true;

  constructor(
    private playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public eventManager: EventManager
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

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  public trackId(index: number, item: IPlayer): number {
    return item.id;
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.playerService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPlayer[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IPlayer[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.players = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
