import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { MapLayoutComponent } from './layouts/map-layout/map-layout.component';
import { MapHeaderComponent } from './components/map-header/map-header.component';

const COMPONENTS = [HeaderComponent, MapHeaderComponent, FooterComponent];

const LAYOUTS = [BaseLayoutComponent, MapLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, ...LAYOUTS],
})
export class ThemeModule {}
