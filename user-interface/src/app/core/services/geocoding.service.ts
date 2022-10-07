import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  cityName$: BehaviorSubject<string> = new BehaviorSubject('');
  state$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private mapService: MapService) {
    this.mapService
      .getCoordinate()
      .subscribe((coordinate: Coordinate) => this.reverseGeocode(coordinate));
  }

  public geocode(name: String): Coordinate {
    return [];
  }

  public reverseGeocode(coordinate: Coordinate) {
    // TODO: Call geocoding API to actually resolve input

    this.cityName$.next('Berlin Mitte');
    this.state$.next('Berlin');
  }

  public getCityName(): BehaviorSubject<string> {
    return this.cityName$;
  }

  public getStateName(): BehaviorSubject<string> {
    return this.state$;
  }
}
