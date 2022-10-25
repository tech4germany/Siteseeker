import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import {
  IReverseGeocodeResponse,
  reverseGeocode,
} from '@esri/arcgis-rest-geocoding';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 *  A Service to resolve coordinates to address via the arcgis geocoding API.
 *  The corresponding API key can be found in the environment configuration.
 *  */
export class ReverseGeocodingService {
  constructor() {}

  /**
   * It takes a coordinate (latitude and longitude) and returns a promise that resolves to an object containing the address
   * of the coordinate
   * @param {Coordinate} coordinate - The coordinate to reverse geocode.
   * @returns A promise that resolves to an IReverseGeocodeResponse
   */
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
