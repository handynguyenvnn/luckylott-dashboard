import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Injector } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { EventManager } from 'src/app/core';
import { NzModalRef } from 'ng-zorro-antd';

export abstract class EditComponent implements OnInit, OnDestroy {
  @Input() queryParams: any = {};
  id: any;
  detailObject: any = {};
  errors: any = {};
  isSaved: boolean = false;
  isSaving: boolean = false;
  subscriptions?: Subscription[] = [];
  callApi$ = new Subject();
  constructor(
    public eventManager: EventManager,
    public route: ActivatedRoute,
    public modal: NzModalRef,
  ) {
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.id = params.id;
    if (this.id) {
      this.getDetail();
    }
    this.callApi$.pipe(
      debounceTime(500),
      ).subscribe((event)=> { return this.callAPI(event);});
  }
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.eventManager.destroys(this.subscriptions);
    }
  }
  getDetail() {}
  onSuccess(res) {}
  onError(error) {}
  updateForm() {}
  onSaveSuccess(): void {
    this.modal.destroy();
    this.isSaving = false;
  }
  onSaveError(): void {
    this.isSaving = false;
  }
  destroyModal(): void {
    this.modal.destroy();
  }
  disabledButton() {
    const keys = Object.keys(this.errors);
    const key = keys.find(key => this.errors[key]);
    return key ? true : false;
  }
  callAPI(event?) {
  }
  executeCallAPI(event?) {
    this.callApi$.next(event || true);
  }
  save() {
    this.isSaved =  true;
    if (this.disabledButton()) {
      return;
    }
  }
}
