import { Injectable, Sanitizer, SecurityContext } from '@angular/core';
import { ConfigService } from './config.service';

export type StarBapAlertType = 'success' | 'danger' | 'warning' | 'info';

// tslint:disable-next-line:interface-name
export interface StarBapAlert {
  id?: number;
  type: StarBapAlertType;
  msg: string;
  params?: any;
  timeout?: number;
  toast?: boolean;
  position?: string;
  scoped?: boolean;
  close?: (alerts: StarBapAlert[]) => void;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private sanitizer: Sanitizer, private configService: ConfigService) {
    const config = this.configService.getConfig();
    this.toast = config.alertAsToast;
    this.i18nEnabled = false;
    this.alertId = 0; // unique id for each alert. Starts from 0.
    this.alerts = [];
    this.timeout = config.alertTimeout;
  }
  private alertId: number;
  private alerts: StarBapAlert[];
  private timeout: number;
  private toast: boolean;
  private i18nEnabled: boolean;

  public clear() {
    this.alerts.splice(0, this.alerts.length);
  }

  public get(): StarBapAlert[] {
    return this.alerts;
  }

  public success(msg: string, params?: any, position?: string): StarBapAlert {
    return this.addAlert(
      {
        type: 'success',
        msg,
        params,
        timeout: this.timeout,
        toast: this.isToast(),
        position,
      },
      [],
    );
  }

  public error(msg: string, params?: any, position?: string): StarBapAlert {
    return this.addAlert(
      {
        type: 'danger',
        msg,
        params,
        timeout: this.timeout,
        toast: this.isToast(),
        position,
      },
      [],
    );
  }

  public warning(msg: string, params?: any, position?: string): StarBapAlert {
    return this.addAlert(
      {
        type: 'warning',
        msg,
        params,
        timeout: this.timeout,
        toast: this.isToast(),
        position,
      },
      [],
    );
  }

  public info(msg: string, params?: any, position?: string): StarBapAlert {
    return this.addAlert(
      {
        type: 'info',
        msg,
        params,
        timeout: this.timeout,
        toast: this.isToast(),
        position,
      },
      [],
    );
  }

  public addAlert(alertOptions: StarBapAlert, extAlerts: StarBapAlert[]): StarBapAlert {
    alertOptions.id = this.alertId++;
    const alert = this.factory(alertOptions);
    if (alertOptions.timeout && alertOptions.timeout > 0) {
      setTimeout(() => {
        this.closeAlert(alertOptions.id, extAlerts);
      }, alertOptions.timeout);
    }
    return alert;
  }

  public closeAlert(id: number, extAlerts?: StarBapAlert[]): any {
    const thisAlerts: StarBapAlert[] = extAlerts && extAlerts.length > 0 ? extAlerts : this.alerts;
    return this.closeAlertByIndex(thisAlerts.map((e) => e.id).indexOf(id), thisAlerts);
  }

  public closeAlertByIndex(index: number, thisAlerts: StarBapAlert[]): StarBapAlert[] {
    return thisAlerts.splice(index, 1);
  }

  public isToast(): boolean {
    return this.toast;
  }

  private factory(alertOptions: StarBapAlert): StarBapAlert {
    const alert: StarBapAlert = {
      type: alertOptions.type,
      // msg: this.sanitizer.sanitize(SecurityContext.HTML, alertOptions.msg),
      msg: alertOptions.msg,
      id: alertOptions.id,
      timeout: alertOptions.timeout,
      toast: alertOptions.toast,
      position: alertOptions.position ? alertOptions.position : 'top right',
      scoped: alertOptions.scoped,
      close: (alerts: StarBapAlert[]) => {
        return this.closeAlert(alertOptions.id, alerts);
      },
    };
    if (!alert.scoped) {
      this.alerts.push(alert);
    }
    return alert;
  }
}
