import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WmsService } from './layer-services/wms.service';
import { SatelliteService } from './layer-services/satellite.service';
import { OpenStreetMapService } from './layer-services/open-street-map.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Set base coords for initialisation of map
  baseCoordinate: Coordinate = [7.74005, 49.43937];

  coordinate$: BehaviorSubject<Coordinate> = new BehaviorSubject<Coordinate>(
    proj.transform(this.baseCoordinate, 'EPSG:4326', 'EPSG:3857')
  );
  inputCoordinate$: BehaviorSubject<Coordinate> = new BehaviorSubject(
    this.baseCoordinate
  );
  radius$: BehaviorSubject<number> = new BehaviorSubject<number>(300);

  constructor(
    private httpClient: HttpClient,
    private wmsService: WmsService,
    private satelliteService: SatelliteService,
    private osmService: OpenStreetMapService
  ) {
    this.osmService.toggleOSMLayer(true);
  }

  /* -------------------- Coordinate Setters / Getters -------------------- */
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

  /* -------------------- Layer Controls -------------------- */

  public baseMapControl(map: string | undefined | null) {
    switch (map) {
      case 'base':
        this.osmService.toggleOSMLayer(true);
        this.satelliteService.toggleSatelliteLayer(false);
        // TODO: Add Topo Service
        break;
      case 'satellite':
        this.osmService.toggleOSMLayer(false);
        this.satelliteService.toggleSatelliteLayer(true);
        // TODO: Add Topo Service
        break;
      case 'topo':
        this.osmService.toggleOSMLayer(false);
        this.satelliteService.toggleSatelliteLayer(false);
        // TODO: Add Topo Service
        break;

      default:
        this.osmService.toggleOSMLayer(true);
        this.satelliteService.toggleSatelliteLayer(false);
      // TODO: Add Topo Service
    }
  }

  public extendedMapControl(
    value: Partial<{
      liegenschaften: boolean | null;
      nutzung: boolean | null;
      gebaeude: boolean | null;
      lagebezeichnung: boolean | null;
      flurstuecke: boolean | null;
      hintergrund: boolean | null;
    }>
  ) {
    if (value.liegenschaften !== undefined && value.liegenschaften !== null)
      this.wmsService.toggleRLP_ALKIS(value.liegenschaften);
    if (value.flurstuecke !== undefined && value.flurstuecke !== null)
      this.wmsService.toggleRLP_Flurstuecke(value.flurstuecke);
    if (value.gebaeude !== undefined && value.gebaeude !== null)
      this.wmsService.toggleRLP_GebaeudeBauwerke(value.gebaeude);
    if (value.nutzung !== undefined && value.nutzung !== null)
      this.wmsService.toggleRLP_Nutzung(value.nutzung);
    if (value.lagebezeichnung !== undefined && value.lagebezeichnung !== null)
      this.wmsService.toggleRLP_Lagebzeichnungen(value.lagebezeichnung);
    if (value.hintergrund !== undefined && value.hintergrund !== null)
      this.wmsService.toggleRLP_Hintergrund(value.hintergrund);
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
