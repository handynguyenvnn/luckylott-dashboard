import { Injectable } from '@angular/core';
import { ModuleConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public CONFIG_OPTIONS: ModuleConfig;

  constructor(moduleConfig?: ModuleConfig) {
    this.CONFIG_OPTIONS = {
      ...new ModuleConfig(),
      ...moduleConfig,
    };
  }

  public getConfig(): ModuleConfig {
    return this.CONFIG_OPTIONS;
  }
}
