import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { ReverseGeocodingService } from './services/data-services/reverse-geocoding.service';
import { AuthService } from './services/utility-services/auth.service';
import { CourtService } from './services/data-services/court.service';
import { LayersControlService } from './services/utility-services/layers-control.service';
import { MapService } from './services/utility-services/map.service';
import { SidebarService } from './services/utility-services/sidebar.service';
import { FlurstueckService } from './services/layer-services/flurstueck.service';
import { GemarkungenService } from './services/data-services/gemarkungen.service';
import { LocationService } from './services/layer-services/location.service';
import { SearchAreaService } from './services/layer-services/search-area.service';

/*
 * All services that are used in the application.
 * These are registered as data providers in the app.module.ts via the modules forRoot() Method
 */
export const SERVICES = [
  ReverseGeocodingService,
  AuthService,
  CourtService,
  LayersControlService,
  MapService,
  SidebarService,
  FlurstueckService,
  GemarkungenService,
  LocationService,
  SearchAreaService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
/* The core module contains all business logic of the application, including models, services and route guards */
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
