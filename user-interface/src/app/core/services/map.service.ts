import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { WmsService } from './layer-services/wms.service';
import { SatelliteService } from './layer-services/satellite.service';
import { OpenStreetMapService } from './layer-services/open-street-map.service';
import { SearchArea } from '../models/searcharea';
import { MapConfig } from '../models/mapconfig';
import View from 'ol/View';
import { GemarkungenService } from './layer-services/gemarkungen.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Set base coords for initialisation of map
  baseCoordinate: Coordinate = [7.74005, 49.43937];
  baseZoom: number = 15.5;
  baseRadius: number = 1000;

  private _mapConfig$: BehaviorSubject<MapConfig>;
  private _mapConfig: MapConfig;
  private _searchArea$: BehaviorSubject<SearchArea>;
  private _searchArea: SearchArea;

  private view: View;

  constructor(
    private httpClient: HttpClient,
    private osmService: OpenStreetMapService
  ) {
    this.view = new View({
      center: this.baseCoordinate,
      zoom: this.baseZoom,
    });

    this._searchArea = new SearchArea(this.baseCoordinate, this.baseRadius);
    this._mapConfig = new MapConfig(this.baseCoordinate, this.baseZoom);
    this._mapConfig$ = new BehaviorSubject<MapConfig>(this._mapConfig);
    this._searchArea$ = new BehaviorSubject(this._searchArea);

    // Load attributes from local storage
    if (localStorage.getItem('searchArea')) {
      let fetchedSearchArea = JSON.parse(
        localStorage.getItem('searchArea')!
      ) as SearchArea;
      Object.assign(this._searchArea, fetchedSearchArea);
      //this._searchArea$.next(this._searchArea);
    }
    if (localStorage.getItem('mapConfig')) {
      let fetchedMapConfig = JSON.parse(
        localStorage.getItem('mapConfig')!
      ) as MapConfig;
      Object.assign(this._mapConfig, fetchedMapConfig);
      // this._mapConfig$.next(this._mapConfig);
    }

    // Update service and local storage on changes
    this._searchArea$.subscribe(searchArea => {
      console.log('Loop', searchArea);
      localStorage.setItem('searchArea', JSON.stringify(searchArea));
      this._searchArea = searchArea;
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
