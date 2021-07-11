import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageInfoService} from './message-info.service';
import {IMessageInfo} from '../../shared/model';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-message-out',
  templateUrl: './message-out.component.html',
  styleUrls: ['./message-out.component.scss']
})
export class MessageOutComponent implements OnInit {
  messageInfos?: IMessageInfo[];
  isSpinning = true;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;

  constructor(
    protected messageInfoService: MessageInfoService,
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

  public trackId(index: number, item: IMessageInfo): number {
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

    this.messageInfoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IMessageInfo[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IMessageInfo[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.messageInfos = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  deleteMsg(messageInfo: IMessageInfo) {
    this.messageInfoService.deleteMsg(messageInfo).subscribe(
      () => console.log('delete msg done')
    );
  }

  deleteMsgAction(messageInfo: IMessageInfo) {
    this.messageInfoService.deleteMesByAction(messageInfo).subscribe(
      () => console.log('delete msg action done')
    );
  }
}
