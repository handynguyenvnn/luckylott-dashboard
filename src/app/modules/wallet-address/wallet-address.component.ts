import { Component, OnInit } from '@angular/core';
import { WalletAddressService } from './wallet-address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { PlayerService } from '../player/player.service';
import {IPlayer, IWalletAddress} from '../../shared/model';
import {ITEMS_PER_PAGE} from '../../shared/constants';

@Component({
  selector: 'app-wallet-address',
  templateUrl: './wallet-address.component.html',
  styleUrls: ['./wallet-address.component.scss']
})
export class WalletAddressComponent implements OnInit {
  isSpinning = true;
  players: IPlayer[] = [];
  public walletAddresses?: IWalletAddress[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  constructor(
    private walletAddressService: WalletAddressService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private modalService: NzModalService,
    protected playerService: PlayerService,
  ) { }

  public ngOnInit(): void {
    this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
  }

  public trackId(index: number, item: IWalletAddress): number {
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

    this.walletAddressService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IWalletAddress[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IWalletAddress[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.walletAddresses = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public confirmDelete(id: number) {
    this.walletAddressService.delete(id).subscribe((rs) => {
      this.loadPage();
    });
  }

  public cancelDelete() {
    // todo
  }

  public getPlayerName(playerId: number) {
    const player = this.players.find((i) => i.id === playerId);
    return player ? player.teleName : '';
  }
}
