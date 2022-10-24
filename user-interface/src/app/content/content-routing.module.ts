import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapComponent } from './map/map.component';
import { BaseLayoutComponent } from '../theme/layouts/base-layout/base-layout.component';
import { MapLayoutComponent } from '../theme/layouts/map-layout/map-layout.component';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { SignUpComponent } from './authetication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authetication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authetication/verify-email/verify-email.component';
import { SignInComponent } from './authetication/sign-in/sign-in.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RedirectGuard } from '../core/guards/redirect.guard';

/**
 * This is the routing configuration for the application.
 * It is only used if the content module is lazily loaded int the app.routing-module.ts.
 *
 * The routing configuration utilizes hierarchical routes with route guards.
 * Child routes are used for the integration of layouts for the app shell.
 */
const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [RedirectGuard] },
  {
    path: 'register-user',
    component: SignUpComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'landingspace',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: LandingPageComponent }],
  },
  {
    path: 'userspace',
    component: MapLayoutComponent,
    canActivate: [AuthGuard],
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

  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
