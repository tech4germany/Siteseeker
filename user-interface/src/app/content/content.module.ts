import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../theme/theme.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapComponent } from './map/map.component';
import { CustomControlsComponent } from './map/custom-controls/custom-controls.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { SidebarLeftComponent } from './map-overlay/components/sidebar-left/sidebar-left.component';
import { LayersMenuComponent } from './map-overlay/components/layers-menu/layers-menu.component';
import { DataBasketComponent } from './map-overlay/components/data-basket/data-basket.component';
import { OverviewMenuComponent } from './map-overlay/components/sidebar-left/overview-menu/overview-menu.component';
import { LocalInfoMenuComponent } from './map-overlay/components/sidebar-left/local-info-menu/local-info-menu.component';
import { LocationDetailsComponent } from './map-overlay/components/sidebar-left/overview-menu/location-details/location-details.component';
import { GovernmentStructureComponent } from './map-overlay/components/sidebar-left/local-info-menu/government-structure/government-structure.component';
import { InfrastructureInformationComponent } from './map-overlay/components/sidebar-left/local-info-menu/infrastructure-information/infrastructure-information.component';
import { SignInComponent } from './authetication/sign-in/sign-in.component';
import { SignUpComponent } from './authetication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authetication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authetication/verify-email/verify-email.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LandingPageComponent,
    MapComponent,
    CustomControlsComponent,
    MapOverlayComponent,
    SidebarLeftComponent,
    LayersMenuComponent,
    DataBasketComponent,
    OverviewMenuComponent,
    LocalInfoMenuComponent,
    LocationDetailsComponent,
    GovernmentStructureComponent,
    InfrastructureInformationComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
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
