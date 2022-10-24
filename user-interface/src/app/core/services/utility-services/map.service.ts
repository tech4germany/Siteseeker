import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { HttpClient } from '@angular/common/http';
import { SearchArea } from '../../models/config/searcharea';
import { MapConfig } from '../../models/config/mapconfig';
import View from 'ol/View';
import { ReverseGeocodingService } from '../data-services/reverse-geocoding.service';
import { Address } from '../../models/data/address';
import { Layer } from 'ol/layer';
import Map from 'ol/Map';
import {
  openstreetmapLayer,
  rlpFlurstueckLayer,
  rlpGebaeudeLayer,
  rlpGemarkungenLayer,
  rlpUmweltLayer,
  satelliteLayer,
} from '../../map-layers';
import { GemarkungenService } from '../data-services/gemarkungen.service';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { Circle } from 'ol/geom';
import { Court } from '../../models/data/court';
import { GeoJSON } from 'ol/format';
import { CourtService } from '../data-services/court.service';
import { Vector as VectorSource } from 'ol/source';
import * as proj from 'ol/proj';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  /* The initial configuration of the map */
  baseCoordinate: Coordinate = [7.74005, 49.43937];
  baseZoom: number = 16;
  baseRadius: number = 600;

  /* Global configuration of the current map state (zoom level and center coordinates) */
  private _mapConfig: MapConfig;
  private _mapConfig$: BehaviorSubject<MapConfig>;

  /* Global configuration of our current search area. Includes all relevant data in the search area */
  private _searchArea: SearchArea;
  private _searchArea$: BehaviorSubject<SearchArea>;

  /* Used to control current view of the map */
  private view: View;

  constructor(
    private httpClient: HttpClient,
    private geocodingService: ReverseGeocodingService,
    private gemarkungenService: GemarkungenService,
    private courtService: CourtService
  ) {
    this.view = new View({
      center: this.baseCoordinate,
      zoom: this.baseZoom,
    });

    /*
     * The following part checks if state objects have been persisted in local storage
     * If there are objects, it rebuilds the search area from the chunks and loads the observables
     * with the appropriate objects, emitting the saved state of the application to all other components.
     */

    /* Rebuild search area */
    let rebuildCoordinate: Coordinate = this.baseCoordinate;
    const storedCoordinate = localStorage.getItem('inputCoordinate');
    if (storedCoordinate) {
      Object.assign(
        rebuildCoordinate,
        JSON.parse(storedCoordinate) as Coordinate
      );
    }
    let rebuildRadius: number = this.baseRadius;
    const storedRadius = localStorage.getItem('radius');
    if (storedRadius) {
      Object.assign(rebuildRadius, JSON.parse(storedRadius) as number);
    }
    this._searchArea = new SearchArea(rebuildCoordinate, rebuildRadius);

    /* Rebuild map configuration */
    this._mapConfig = new MapConfig(
      proj.transform(rebuildCoordinate, 'EPSG:4326', 'EPSG:3857'),
      this.baseZoom
    );
    if (localStorage.getItem('mapConfig')) {
      let fetchedMapConfig = JSON.parse(
        localStorage.getItem('mapConfig')!
      ) as MapConfig;
      Object.assign(this._mapConfig, fetchedMapConfig);
    }

    this._mapConfig$ = new BehaviorSubject<MapConfig>(this._mapConfig);
    this._searchArea$ = new BehaviorSubject(this._searchArea);

    /* Call the geocoding service to resolve the saved coordinates to their actual address */
    this.geocodingService
      .reverseGeocode(this._searchArea.inputCoordinate)
      .then(value => {
        this._searchArea.address = <Address>value.address;
        this._searchArea$.next(this._searchArea);
      });

    /* Update service state and local storage on changes */
    this._searchArea$.subscribe(searchArea => {
      this._searchArea = searchArea;
      // store chunks of the searchArea Item in local storage to not reach storage limit
      localStorage.setItem(
        'inputCoordinate',
        JSON.stringify(searchArea.inputCoordinate)
      );
      console.log('Radius', searchArea.radius);
      localStorage.setItem('radius', JSON.stringify(searchArea.radius));
    });

    this._mapConfig$.subscribe(mapConfig => {
      localStorage.setItem('mapConfig', JSON.stringify(mapConfig));
      this._mapConfig = mapConfig;
    });
  }

  /**
   * Takes a coordinate and a radius, then sets the search area to the coordinate and radius, and then it sets
   * the map center to the coordinate
   * @param {Coordinate} coordinate - Coordinate - The coordinate of the center of the search area.
   * @param {number} radius - The radius of the search area in meters.
   */
  public setSearchArea(coordinate: Coordinate, radius: number) {
    this._searchArea.inputCoordinate = coordinate;
    this._searchArea.radius = radius;
    this._searchArea$.next(this._searchArea);

    this._mapConfig.center = this._searchArea.coordinate;
    this.mapConfig$.next(this._mapConfig);
  }

  get mapConfig$(): BehaviorSubject<MapConfig> {
    return this._mapConfig$;
  }

  get searchArea$(): BehaviorSubject<SearchArea> {
    return this._searchArea$;
  }

  /**
   * If the toggle is true, set the layer to visible. If the toggle is false, set the layer to invisible
   * @param {boolean} toggle - boolean - The state to toggle to
   * @param {Layer} layer - Layer - The layer to toggle
   */
  public toggleLayer(toggle: boolean, layer: Layer) {
    layer.setVisible(toggle);
  }

  /**
   * Adds the layers to the map
   * @param {Map | undefined} map - The Map where the layers are added
   * @param {View} view - View - the view of the map
   */
  public initLayers(map: Map | undefined, view: View) {
    this.setGemarkungenSource(view);
    map?.addLayer(openstreetmapLayer);
    map?.addLayer(satelliteLayer);
    map?.addLayer(rlpUmweltLayer);
    map?.addLayer(rlpGebaeudeLayer);
    map?.addLayer(rlpFlurstueckLayer);
    map?.addLayer(rlpGemarkungenLayer);
  }

  /**
   * Load the gemarkungen data for our search radius and set the data source of the gemarkungen layer
   * @param {View} view - View - the current map view
   */
  private setGemarkungenSource(view: View) {
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this._searchArea.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number =
      (this._searchArea.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleGeometry = new Circle(this._searchArea.coordinate, radius);
    this.gemarkungenService
      .getRLPData(circleGeometry.getExtent())
      .subscribe(data => {
        // Get courtdata to resolve court names from api to court information from local json db
        this.courtService.getCourtsObservable().subscribe((courts: Court[]) => {
          this._searchArea.setGemarkungenGeoJSON(data, courts);
          this.searchArea$.next(this._searchArea);
          var gemarkungenSource: VectorSource = new VectorSource();
          gemarkungenSource.addFeatures(new GeoJSON().readFeatures(data));

          rlpGemarkungenLayer.setSource(gemarkungenSource);
        });
      });
  }
}
