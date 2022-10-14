import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';
import { MapService } from './map.service';

import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { environment } from '../../../environments/environment';
import { Address } from '../models/address';
import { SearchArea } from '../models/searcharea';
import View from 'ol/View';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private searchArea: SearchArea;

  constructor(private mapService: MapService) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe((searchArea: SearchArea) => {
      this.searchArea = searchArea;
      //this.reverseGeocode(searchArea.inputCoordinate);
    });
  }

  public geocode(name: String): Coordinate {
    return [];
  }

  public reverseGeocode(coordinate: Coordinate) {
    const authentication = ApiKeyManager.fromKey(
      environment.reverseGeocodeAPIKey
    );

    const revGeocode = reverseGeocode([coordinate[0], coordinate[1]], {
      authentication,
    });
    revGeocode.then(value => {
      this.searchArea.address = <Address>value.address;
    });
  }
}
