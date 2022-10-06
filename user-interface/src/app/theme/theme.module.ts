import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { MapLayoutComponent } from './layouts/map-layout/map-layout.component';
import { MapHeaderComponent } from './components/map-header/map-header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BaseLayoutComponent, MapLayoutComponent, MapHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class ThemeModule {}
