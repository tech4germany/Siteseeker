import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';
import { MapService } from './map.service';

import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { environment } from '../../../environments/environment';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  cityName$: BehaviorSubject<string> = new BehaviorSubject('');
  state$: BehaviorSubject<string> = new BehaviorSubject('');
  address$: BehaviorSubject<Address> = new BehaviorSubject(
    new Address(
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
    )
  );

  constructor(private mapService: MapService) {
    this.mapService
      .getInputCoordinate()
      .subscribe((coordinate: Coordinate) => this.reverseGeocode(coordinate));
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
      const address: Address = <Address>value.address;
      this.address$.next(address);
    });
  }

  public getMarkerAddress(): BehaviorSubject<Address> {
    return this.address$;
  }
}
