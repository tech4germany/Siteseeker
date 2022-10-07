import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GeocodingService } from './geocoding.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  coordinate$: BehaviorSubject<Coordinate> = new BehaviorSubject<Coordinate>(
    proj.transform(
      [13.40940990769482, 52.520831598904365],
      'EPSG:4326',
      'EPSG:3857'
    )
  );
  inputCoordinate$: BehaviorSubject<Coordinate> = new BehaviorSubject([
    13.40940990769482, 52.520831598904365,
  ]);
  radius$: BehaviorSubject<number> = new BehaviorSubject<number>(300);

  satelliteSwitch: boolean = false;
  satelliteSwitch$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.satelliteSwitch
  );

  constructor(private httpClient: HttpClient) {}

  public setCoordinate(longitude: number, latitude: number) {
    this.coordinate$.next(
      proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
    );
    this.inputCoordinate$.next([longitude, latitude]);
  }

  public setRadius(radius: number) {
    this.radius$.next(radius);
  }

  public getCoordinate(): BehaviorSubject<Coordinate> {
    return this.coordinate$;
  }

  public getInputCoordinate(): BehaviorSubject<Coordinate> {
    return this.inputCoordinate$;
  }

  public getRadius(): BehaviorSubject<number> {
    return this.radius$;
  }

  public getBuildingsBerlin(): Observable<any> {
    return this.httpClient.get<any>(environment.geoDataApi).pipe(
      tap(_ => console.log(`fetched Buildings Berlin`)),
      catchError(this.handleError<any>('getBuildingsBerlin'))
    );
  }

  public switchLayer() {
    this.satelliteSwitch = !this.satelliteSwitch;
    this.satelliteSwitch$.next(this.satelliteSwitch);
  }

  public getSatelliteSwitch(): BehaviorSubject<boolean> {
    return this.satelliteSwitch$;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @private
   * @template T
   * @param {string} [operation='operation'] - name of the operation that failed
   * @param {T} [result] - optional value to return as the observable result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
