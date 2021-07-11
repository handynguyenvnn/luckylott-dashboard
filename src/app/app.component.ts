import { Component } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { LocalStorageService } from 'ngx-webstorage';
import { EventManager } from './core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private title = 'LuckyLott Admin';
  ignoreApi: any[] = [];
  beforeMessage: string = '';
  constructor(
    // private primengConfig: PrimeNGConfig,
    private notification: NzNotificationService,
    private eventManager: EventManager,
    private $localStorage: LocalStorageService
  ) {

  }
  ngOnInit() {
    this.initIgnorepis();
    this.eventManager.subscribe('starBapApp.httpError', (res) => {
      if (!this.ignoreError(res.content.url || '')) {
        if (res.content.message === this.beforeMessage) {
          return;
        }
        this.beforeMessage = res.content.message;
        setTimeout(() => {
          this.beforeMessage = '';
        }, 2000)
        const title = (res.content.error || {}).title || 'Error'
        const message = (res.content.error || {}).detail || 'Error Happen. Please try again!';
        this.notification.create(
          'error',
          title,
          message
        );
      }
    });
  }
  initIgnorepis() {
    this.ignoreApi = [
     'job-detail'
    ];
  }
  ignoreError(url) {
    return this.ignoreApi.some((api) => url.includes(api));
  }
}
