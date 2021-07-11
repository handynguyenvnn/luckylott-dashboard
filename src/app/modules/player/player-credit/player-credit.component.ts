import { Component, OnInit } from '@angular/core';
import {IPlayer, IPlayerCredit} from '../../../shared/model';
import {PlayerCreditService} from '../player-credit.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ITEMS_PER_PAGE} from '../../../shared/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-player-credit',
  templateUrl: './player-credit.component.html',
  styleUrls: ['./player-credit.component.scss']
})
export class PlayerCreditComponent implements OnInit {
  player: IPlayer | null = null;
  playerId: number;
  playerCredits?: IPlayerCredit[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;

  constructor(
    protected playerCreditService: PlayerCreditService,
    private playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.playerId = id;
    this.playerService.find(id).subscribe(
      (response: HttpResponse<IPlayer>) => {
        this.player = response.body;
      });
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
  }

  trackId(index: number, item: IPlayerCredit): number {
    return item.id!;
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
    this.playerCreditService
      .queryByPlayer(this.playerId, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPlayerCredit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IPlayerCredit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.playerCredits = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  previousState(): void {
    window.history.back();
  }
}
