import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';
import { MapService } from '../utility-services/map.service';

import {
  IReverseGeocodeResponse,
  reverseGeocode,
} from '@esri/arcgis-rest-geocoding';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { environment } from '../../../../environments/environment';
import { Address } from '../../models/data/address';
import { SearchArea } from '../../models/config/searcharea';
import View from 'ol/View';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor() {}

  public geocode(name: String): Coordinate {
    return [];
  }

  public reverseGeocode(
    coordinate: Coordinate
  ): Promise<IReverseGeocodeResponse> {
    const authentication = ApiKeyManager.fromKey(
      environment.reverseGeocodeAPIKey
    );

    return reverseGeocode([coordinate[0], coordinate[1]], {
      authentication,
    });
  }
}
