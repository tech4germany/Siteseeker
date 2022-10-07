import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../theme/theme.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestMapComponent } from './test-map/test-map.component';
import { MapComponent } from './map/map.component';
import { CustomControlsComponent } from './map/custom-controls/custom-controls.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { SidebarLeftComponent } from './map-overlay/components/sidebar-left/sidebar-left.component';
import { LayersMenuComponent } from './map-overlay/components/layers-menu/layers-menu.component';
import { DataBasketComponent } from './map-overlay/components/data-basket/data-basket.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LandingPageComponent,
    TestMapComponent,
    MapComponent,
    CustomControlsComponent,
    MapOverlayComponent,
    SidebarLeftComponent,
    LayersMenuComponent,
    DataBasketComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgbModule,
    ThemeModule,
    ReactiveFormsModule,
  ],
  exports: [PageNotFoundComponent],
})
export class ContentModule {}
