import { Injectable } from '@angular/core';
import { SearchArea } from '../../models/config/searcharea';
import { Vector as VectorSource } from 'ol/source';
import { Layer, Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { MapService } from '../utility-services/map.service';
import { HttpClient } from '@angular/common/http';
import { CourtService } from '../data-services/court.service';
import Map from 'ol/Map';
import View from 'ol/View';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { Circle } from 'ol/geom';
import { GeoJSON } from 'ol/format';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import Feature, { FeatureLike } from 'ol/Feature';
import { Flurstueck } from '../../models/data/flurstueck';

@Injectable({
  providedIn: 'root',
})
export class FlurstueckService {
  // Global state
  private searchArea: SearchArea;

  // Layer data
  private flurstueckeSource: VectorSource = new VectorSource();
  private flurstuecke = new VectorLayer({
    visible: false,
    minZoom: 16,
    style: new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#38cc33',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 1,
        }),
      }),
    }),
  });

  // Selection data and state
  private selectedFlurstuecke: Feature[] = [];
  private _selectedFlurstuecke$: BehaviorSubject<Flurstueck[]> =
    new BehaviorSubject<Flurstueck[]>([]);

  // Selection styles
  private highlight = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#cc3333',
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 1,
      }),
    }),
  });
  private hoverHighlight = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#cc8533',
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 1,
      }),
    }),
  });

  constructor(private mapService: MapService, private httpClient: HttpClient) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe(
      searchArea => (this.searchArea = searchArea)
    );
  }

  public initFlurstueckService(map: Map | undefined, view: View) {
    // Circle radius calculation
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.searchArea.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number =
      (this.searchArea.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleGeometry = new Circle(this.searchArea.coordinate, radius);
    this.getRLPFlurstueckeData(circleGeometry.getExtent()).subscribe(data => {
      let featureData: Feature[] = new GeoJSON().readFeatures(data);

      // Convert features to flurstueck data
      this.searchArea.flurstuecke = this.featuresToFlurstuecke(featureData);
      this.searchArea.setFlurstueckeGeoJSON(data);
      this.mapService.searchArea$.next(this.searchArea);

      // Add data to vector layer
      this.flurstueckeSource.addFeatures(featureData);
      this.flurstuecke.setSource(this.flurstueckeSource);
      map?.addLayer(this.flurstuecke);

      // Add interactions
      // Select multiple
      map?.on('singleclick', e => {
        map.forEachFeatureAtPixel(e.pixel, (f: FeatureLike, l: Layer) => {
          const selIndex = this.selectedFlurstuecke.indexOf(<Feature>f);
          if (l === this.flurstuecke) {
            if (selIndex < 0) {
              // add to selected and change style
              this.selectedFlurstuecke.push(<Feature>f);
              (<Feature>f).setStyle(this.highlight);
            } else {
              // remove on unselect and reset style
              this.selectedFlurstuecke.splice(selIndex, 1);
              (<Feature>f).setStyle(undefined);
            }
            // Update global selected state
            this._selectedFlurstuecke$.next(
              this.featuresToFlurstuecke(this.selectedFlurstuecke)
            );
          }
        });
      });
    });
  }

  public getRLPFlurstueckeData(extent: number[]): Observable<GeoJSON> {
    const api =
      environment.apiRLPwfsFlurstuecke +
      '?service=WFS&' +
      'version=1.1.0&' +
      'request=GetFeature&' +
      'typename=vermkv:Flurstueckskoordinaten&' +
      'outputFormat=geojson&' +
      'srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857';

    return this.httpClient
      .get<GeoJSON>(api)
      .pipe(catchError(this.handleError<GeoJSON>('getRLPData')));
  }

  private featuresToFlurstuecke(features: Feature[]): Flurstueck[] {
    let flurstuecke: Flurstueck[] = [];
    features.forEach((feature: Feature) => {
      let flurstueck = new Flurstueck();
      flurstueck.nachfolger_flurstuecke = feature.get('nachfolger_flurstuecke');
      flurstueck.vorgaenger_flurstuecke = feature.get('vorgaenger_flurstuecke');
      flurstueck.vermka_bezeichnung = feature.get('vermka_bezeichnung');
      flurstueck.vermka_schluessel = feature.get('vermka_schluessel');
      flurstueck.flur = feature.get('flur');
      flurstueck.land = feature.get('land');
      flurstueck.gemarkung = feature.get('gemarkung');
      flurstueck.gemarkung_bezeichnung = feature.get('gemarkung_bezeichnung');
      flurstueck.gemeinde_bezeichnung = feature.get('gemeinde_bezeichnung');
      flurstueck.gemeinde_schluessel = feature.get('gemeinde_schluessel');
      flurstueck.kennzeichen = feature.get('kennzeichen');
      flurstueck.status = feature.get('status');
      flurstueck.nummer = feature.get('nummer');
      flurstueck.zaehler = feature.get('zaehler');
      flurstueck.nenner = feature.get('nenner');
      flurstueck.ostwert = feature.get('ostwert');
      flurstueck.nordwert = feature.get('nordwert');
      flurstueck.kreis_bezeichnung = feature.get('kreis_bezeichnung');
      flurstueck.kreis_schluessel = feature.get('kreis_schluessel');
      flurstueck.lage = feature.get('lage');

      flurstuecke.push(flurstueck);
    });
    return flurstuecke;
  }

  get selectedFlurstuecke$(): BehaviorSubject<Flurstueck[]> {
    return this._selectedFlurstuecke$;
  }

  set selectedFlurstuecke$(value: BehaviorSubject<Flurstueck[]>) {
    this._selectedFlurstuecke$ = value;
  }

  public toggleFlurstueckLayer(toggle: boolean) {
    this.flurstuecke.setVisible(toggle);
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
