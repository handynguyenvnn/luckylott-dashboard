import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { EventManager } from '../../../app/core';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import { GameUpdateComponent } from './game-update/game-update.component';
import { GameService } from './game.service';
import {IGame} from '../../shared/model';
import { Moment } from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public games?: IGame[];
  public haveGame = false;
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
    private gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private modalService: NzModalService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInGames();
  }

  public trackId(index: number, item: IGame): number {
    return item.id;
  }

  public registerChangeInGames(): void {
    this.eventSubscriber = this.eventManager.subscribe('gameListModification', () => {
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

  public ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.gameService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IGame[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IGame[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.games = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public confirmDelete(id: number) {
    this.gameService.delete(id).subscribe((rs) => {
      this.loadPage();
    });
  }

  public checkGameOpen() {
    this.gameService.checkGameOpen().subscribe(
      (resp: HttpResponse<any>) => {
        this.haveGame = resp.body;
      });
  }

  public buildGameModal(game?: IGame): void {
    let title = 'Add Game';
    if (game) {
      title = 'Update Game';
    }
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: GameUpdateComponent,
      nzComponentParams: { game },
    });
  }

  convertUTC(date: Moment) {
    if (date) {
      return date.utc().format('YYYY-MM-DD HH:mm:ss');
    }
    return '';
  }
}
