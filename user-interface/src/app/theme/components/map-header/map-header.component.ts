import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../core/services/utility-services/map.service';
import { ReverseGeocodingService } from '../../../core/services/data-services/reverse-geocoding.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/utility-services/auth.service';
import { SearchArea } from '../../../core/models/config/searcharea';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss'],
})
/* The map layouts header that displays location specific data */
export class MapHeaderComponent implements OnInit {
  public searchArea: SearchArea;

  constructor(
    private mapService: MapService,
    private geocodingService: ReverseGeocodingService,
    private router: Router,
    public authService: AuthService
  ) {
    this.searchArea = new SearchArea([], 0);
  }

  /**
   * Fetches current search area data to display coordinates, radius and current address in the header
   */
  ngOnInit(): void {
    this.mapService.searchArea$.subscribe(
      searchArea => (this.searchArea = searchArea)
    );
  }

  /**
   * This is a utility function to shorten the displayed coordinates decimal representation
   * @param {number} num - The number you want to shorten.
   * @returns The number is being rounded to 5 decimal places.
   */
  public shortenDecimal(num: number) {
    return Math.round(num * 100000) / 100000;
  }

  /**
   * This function navigates to the landing page
   */
  public navigateToLandingpage() {
    this.router.navigateByUrl('/landingspace');
  }
}
