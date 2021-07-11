import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  constructor(private $sessionStorage: SessionStorageService) {}

  public getPreviousState() {
    return this.$sessionStorage.retrieve('previousState');
  }

  public resetPreviousState() {
    this.$sessionStorage.clear('previousState');
  }

  public storePreviousState(previousStateName, previousStateParams) {
    const previousState = { name: previousStateName, params: previousStateParams };
    this.$sessionStorage.store('previousState', previousState);
  }

  public getDestinationState() {
    return this.$sessionStorage.retrieve('destinationState');
  }

  public storeUrl(url: string) {
    this.$sessionStorage.store('previousUrl', url);
  }

  public getUrl() {
    return this.$sessionStorage.retrieve('previousUrl');
  }

  public storeDestinationState(destinationState, destinationStateParams, fromState) {
    const destinationInfo = {
      destination: {
        name: destinationState.name,
        data: destinationState.data,
      },
      params: destinationStateParams,
      from: {
        name: fromState.name,
      },
    };
    this.$sessionStorage.store('destinationState', destinationInfo);
  }
}
