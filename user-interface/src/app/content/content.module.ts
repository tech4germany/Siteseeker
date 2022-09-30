import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../theme/theme.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestMapComponent } from './test-map/test-map.component';

@NgModule({
  declarations: [PageNotFoundComponent, LandingPageComponent, TestMapComponent],
  imports: [CommonModule, ContentRoutingModule, NgbModule, ThemeModule],
  exports: [PageNotFoundComponent],
})
export class ContentModule {}
