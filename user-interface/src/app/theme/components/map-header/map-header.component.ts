import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../core/services/map.service';
import { Coordinate } from 'ol/coordinate';
import { GeocodingService } from '../../../core/services/geocoding.service';
import { Router } from '@angular/router';
import { Address } from '../../../core/models/Address';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss'],
})
export class MapHeaderComponent implements OnInit {
  public coordinate: Coordinate = [0, 0];
  public radius: number = 0;
  public address: Address = new Address(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );

  constructor(
    private mapService: MapService,
    private geocodingService: GeocodingService,
    private router: Router,
    public authService: AuthService
  ) {
    this.mapService
      .getInputCoordinate()
      .subscribe((coordinate: Coordinate) => (this.coordinate = coordinate));
    this.mapService
      .getRadius()
      .subscribe((radius: number) => (this.radius = radius));
    this.geocodingService
      .getMarkerAddress()
      .subscribe((address: Address) => (this.address = address));
  }

  ngOnInit(): void {}

  public shortenDecimal(num: number) {
    return Math.round(num * 100000) / 100000;
  }

  public navigateToLandingpage() {
    this.router.navigateByUrl('/landingspace');
  }
}
