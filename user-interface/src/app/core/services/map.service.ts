import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { HttpClient } from '@angular/common/http';
import { OpenStreetMapService } from './layer-services/open-street-map.service';
import { SearchArea } from '../models/config/searcharea';
import { MapConfig } from '../models/config/mapconfig';
import View from 'ol/View';
import { GeocodingService } from './geocoding.service';
import { Address } from '../models/data/address';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Set base coords for initialisation of map
  baseCoordinate: Coordinate = [7.74005, 49.43937];
  baseZoom: number = 16;
  baseRadius: number = 600;

  private _mapConfig$: BehaviorSubject<MapConfig>;
  private _mapConfig: MapConfig;
  private _searchArea$: BehaviorSubject<SearchArea>;
  private _searchArea: SearchArea;

  private view: View;

  constructor(
    private httpClient: HttpClient,
    private osmService: OpenStreetMapService,
    private geocodingService: GeocodingService
  ) {
    this.view = new View({
      center: this.baseCoordinate,
      zoom: this.baseZoom,
    });

    this._mapConfig = new MapConfig(this.baseCoordinate, this.baseZoom);
    // The following part checks if state objects have been persisted in local storage
    // If there are objects, it rebuilds the search area from the chunks and loads the observables
    // with the appropriate objects

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

    if (localStorage.getItem('mapConfig')) {
      let fetchedMapConfig = JSON.parse(
        localStorage.getItem('mapConfig')!
      ) as MapConfig;
      Object.assign(this._mapConfig, fetchedMapConfig);
      // this._mapConfig$.next(this._mapConfig);
    }

    this._mapConfig$ = new BehaviorSubject<MapConfig>(this._mapConfig);
    this._searchArea$ = new BehaviorSubject(this._searchArea);

    this.geocodingService
      .reverseGeocode(this._searchArea.inputCoordinate)
      .then(value => {
        this._searchArea.address = <Address>value.address;
        this._searchArea$.next(this._searchArea);
      });

    // Update service and local storage on changes
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

    // Set OSM as default base layer
    this.osmService.toggleOSMLayer(true);
  }

  public setSearchArea(coordinate: Coordinate, radius: number) {
    this._searchArea.inputCoordinate = coordinate;
    this._searchArea.radius = radius;
    this._searchArea$.next(this._searchArea);
  }

  get mapConfig$(): BehaviorSubject<MapConfig> {
    return this._mapConfig$;
  }

  get searchArea$(): BehaviorSubject<SearchArea> {
    return this._searchArea$;
  }
}
