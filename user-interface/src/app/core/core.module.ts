import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { DataService } from './services/data.service';

export const SERVICES = [DataService];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {}

  /**
   * Registers all providers that are declared
   * in the core module in the app.modules.ts
   * (is called in the app.module.ts)
   *
   * @static
   * @returns {ModuleWithProviders<CoreModule>}
   * @memberof CoreModule
   */
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...SERVICES],
    };
  }
}
