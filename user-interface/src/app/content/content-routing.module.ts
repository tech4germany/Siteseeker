import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestMapComponent } from './test-map/test-map.component';
import { MapComponent } from './map/map.component';
import { BaseLayoutComponent } from '../theme/layouts/base-layout/base-layout.component';
import { MapLayoutComponent } from '../theme/layouts/map-layout/map-layout.component';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';

const routes: Routes = [
  { path: '', redirectTo: 'landingspace', pathMatch: 'full' },
  {
    path: 'landingspace',
    component: BaseLayoutComponent,
    children: [{ path: '', component: LandingPageComponent }],
  },
  {
    path: 'userspace',
    component: MapLayoutComponent,
    children: [
      {
        path: '',
        component: MapOverlayComponent,
        children: [
          {
            path: 'map',
            component: MapComponent,
          },
        ],
      },
      { path: '', redirectTo: 'map', pathMatch: 'full' },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
