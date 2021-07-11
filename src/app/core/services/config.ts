import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModuleConfig {
  public i18nEnabled ?= false;
  public defaultI18nLang ?= 'vi';
  public noi18nMessage ?= 'translation-not-found';
  public alertAsToast ?= false;
  public alertTimeout ?= 5000;
  public classBadgeTrue ?= 'badge badge-success';
  public classBadgeFalse ?= 'badge badge-danger';
  public classTrue ?= 'fa fa-lg fa-check text-success';
  public classFalse ?= 'fa fa-lg fa-times text-danger';
}
