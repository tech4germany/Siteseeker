import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../core/services/utility-services/map.service';
import { GeocodingService } from '../../../core/services/data-services/geocoding.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/utility-services/auth.service';
import { SearchArea } from '../../../core/models/config/searcharea';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss'],
})
export class MapHeaderComponent implements OnInit {
  public searchArea: SearchArea;

  constructor(
    private mapService: MapService,
    private geocodingService: GeocodingService,
    private router: Router,
    public authService: AuthService
  ) {
    this.searchArea = new SearchArea([], 0);
  }

  ngOnInit(): void {
    this.mapService.searchArea$.subscribe(
      searchArea => (this.searchArea = searchArea)
    );
  }

  public shortenDecimal(num: number) {
    return Math.round(num * 100000) / 100000;
  }

  public navigateToLandingpage() {
    this.router.navigateByUrl('/landingspace');
  }
}
