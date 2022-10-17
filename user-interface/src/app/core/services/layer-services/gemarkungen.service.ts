import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Map from 'ol/Map';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { Circle } from 'ol/geom';
import { MapService } from '../map.service';
import View from 'ol/View';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchArea } from '../../models/config/searcharea';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import { Stroke, Style } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { CourtService } from '../court.service';
import { Court } from '../../models/data/court';

@Injectable({
  providedIn: 'root',
})
export class GemarkungenService {
  private searchArea: SearchArea;

  private gemarkungenSource: VectorSource = new VectorSource();

  private gemarkungen = new VectorLayer({
    visible: false,
    style: new Style({
      stroke: new Stroke({
        color: 'black',
      }),
    }),
  });

  constructor(
    private mapService: MapService,
    private httpClient: HttpClient,
    private courtService: CourtService
  ) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe(
      searchArea => (this.searchArea = searchArea)
    );
  }

  public initGemarkungenService(map: Map | undefined, view: View) {
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.searchArea.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number =
      (this.searchArea.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleGeometry = new Circle(this.searchArea.coordinate, radius);
    this.getRLPData(circleGeometry.getExtent()).subscribe(data => {
      // Get courtdata to resolve court names from api to court information from local json db
      this.courtService.getCourtsObservable().subscribe((courts: Court[]) => {
        this.searchArea.setGemarkungenGeoJSON(data, courts);
        this.mapService.searchArea$.next(this.searchArea);
        this.gemarkungenSource.addFeatures(new GeoJSON().readFeatures(data));

        this.gemarkungen.setSource(this.gemarkungenSource);

        map?.addLayer(this.gemarkungen);
      });
    });
  }

  public getRLPData(extent: number[]): Observable<GeoJSON> {
    const api =
      environment.apiRLPwfs +
      '?service=WFS&' +
      'version=1.1.0&' +
      'request=GetFeature&' +
      'typename=vermkv:fluren_rlp&' +
      'outputFormat=geojson&' +
      'srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857';

    return this.httpClient.get<GeoJSON>(api).pipe(
      tap(_ => console.log(`fetched data`)),
      catchError(this.handleError<GeoJSON>('getRLPData'))
    );
  }

  public toggleGemarkungenLayer(toggle: boolean) {
    this.gemarkungen.setVisible(toggle);
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
