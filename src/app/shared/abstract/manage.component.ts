import { HttpHeaders } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Injector } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EventManager } from 'src/app/core';
import { QueryParams } from '../model/query.params.model';

export abstract class ManageComponent implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  subscriptions?: Subscription[] = [];
  list?: any[];
  params: any = {};
  queryParams: QueryParams;
  searchParams: any;
  selectedItem: any;
  deleteBoardcast: string;
  isCall = false;
  isSpinning = false;
  constructor(
    public eventManager: EventManager,
  ) {

  }
  ngOnInit() {
    this.subscriptions = [...[
      this.eventManager.subscribe('load-page', (res) => {
        this.loadPage(res.content.page);
      }),
    ]];
    this.defaultParams();
  }

  createBoardCastDelete(deleteBoardcast) {
    this.deleteBoardcast = deleteBoardcast;
    this.subscriptions.push(
      this.eventManager.subscribe(deleteBoardcast, (res) => {
        this.delete();
      })
    );
  }
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.eventManager.destroys(this.subscriptions);
    }
  }
  defaultParams() {
    this.list = [];
    this.queryParams = new QueryParams();
    this.searchParams = Object.assign({}, this.queryParams.searchParams);
  }
  checkChangeSearchParams() {
    const  isChange = Object.keys(this.queryParams.searchParams).some((properties) => {
      return this.queryParams.searchParams[properties] !== this.searchParams[properties];
    });
    if (isChange) {
      this.queryParams.page = 1;
      this.searchParams = Object.assign({}, this.queryParams.searchParams);
    }
    return this.queryParams;
  }
  trackId(index: number, item: any): number {
    return item.id;
  }
  trackIdentity(index: number, item: any) {
    return item.id;
  }
  loadPage(event?: number) {
    const page = event || 1;
    this.queryParams.page = page;
    if (page !== this.queryParams.previousPage) {
      this.queryParams.previousPage = page;
    }
    this.loadAll();
  }
  changePage(page) {
    this.queryParams.page = page;
    this.loadAll();
  }
  changeSize(size) {
    this.queryParams.page = 1;
    this.queryParams.size = size;
    this.loadAll();
  }
  loadAll(req?: any) {}
  onSuccess(data: any[] | null, headers: HttpHeaders, page: number): void {
    this.queryParams.totalItems = Number(headers.get('X-Total-Count'));
    this.queryParams.page = page;
    this.list = data || [];
    this.isSpinning = false;
  }

  onError(): void {
    // this.ngbPaginationPage = this.page;
  }
  sort() {
    const result = [this.queryParams.predicate + ',' + (this.queryParams.ascending ? 'asc' : 'desc')];
    if (this.queryParams.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  createDebounceSearch(id) {
    const searchBox = document.getElementById(id);
    const keyup$ = fromEvent(searchBox, 'keydown');
    keyup$
      .pipe(
        map((i: any) => {}),
        debounceTime(2500)
      )
      .subscribe(() => {
        // this.loadAll();
      });
  }
  search(event) {
    this.eventManager.broadcast({
      name: 'get-value-search',
      content: {}
    });
  }
  getValueSearch(event) {
    this.queryParams.searchParams = event;
    const keys = Object.keys(this.queryParams.searchParams);
    keys.forEach((key) => {
      if (typeof this.queryParams.searchParams[key] === 'string') {
        this.queryParams.searchParams[key] = this.queryParams.searchParams[key].trim();
        if (this.queryParams.searchParams[key] === 'undefined' || this.queryParams.searchParams[key] === '') {
          this.queryParams.searchParams[key] = undefined;
        }
      }
    });
    this.loadPage(1);
  }
  eventSearchParams(key, value) {
    this.eventManager.broadcast({
      name: 'add-option-search',
      content: {
        key, value
      }
    });
  }
  delete() {
  }
  confirmDelete(selectedItem, title?) {
    this.selectedItem = selectedItem;
    // const modal = this.modalService.create({
    //   nzTitle: '',
    //   nzWidth: '650px',
    //   nzStyle: {top: '20px'},
    //   nzContent: ConfirmPopupComponent,
    //   nzComponentParams: {
    //     eventBroadcast: this.deleteBoardcast,
    //     title
    //   },
    //   nzOnOk: (() => { this.delete() })
    // });
  }
  confirmAction(selectedItem, title?, fowardFunc?) {
    this.selectedItem = selectedItem;
    // const modal = this.modalService.create({
    //   nzTitle: '',
    //   nzWidth: '650px',
    //   nzStyle: {top: '20px'},
    //   nzContent: ConfirmPopUpComponent,
    //   nzComponentParams: {
    //     title
    //   },
    //   nzOnOk: (() => { fowardFunc() })
    // });
  }
}
