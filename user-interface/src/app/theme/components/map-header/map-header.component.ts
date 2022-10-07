import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../core/services/map.service';
import { Coordinate } from 'ol/coordinate';
import { GeocodingService } from '../../../core/services/geocoding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss'],
})
export class MapHeaderComponent implements OnInit {
  public coordinate: Coordinate = [0, 0];
  public radius: number = 0;
  public cityName: string = '';
  public state: string = '';

  constructor(
    private mapService: MapService,
    private geocodingService: GeocodingService,
    private router: Router
  ) {
    this.mapService
      .getInputCoordinate()
      .subscribe((coordinate: Coordinate) => (this.coordinate = coordinate));
    this.mapService
      .getRadius()
      .subscribe((radius: number) => (this.radius = radius));
    this.geocodingService
      .getCityName()
      .subscribe((name: string) => (this.cityName = name));
    this.geocodingService
      .getStateName()
      .subscribe((name: string) => (this.state = name));
  }

  ngOnInit(): void {}

  public shortenDecimal(num: number) {
    return Math.round(num * 100000) / 100000;
  }

  public navigateToLandingpage() {
    this.router.navigateByUrl('/landingspace');
  }
}
