import {
  Component,
  NgZone,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Map } from 'ol';

import { MapService } from '../../core/services/utility-services/map.service';
import { LocationService } from '../../core/services/layer-services/location.service';
import { SearchAreaService } from '../../core/services/layer-services/search-area.service';
import { MapConfig } from '../../core/models/config/mapconfig';
import { SearchArea } from '../../core/models/config/searcharea';
import View from 'ol/View';
import { FlurstueckService } from '../../core/services/layer-services/flurstueck.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
/**
 * This component hold the map that is displayed in the userspace.
 * It heavily relies on the map.service.ts for configuring the map.
 */
export class MapComponent implements AfterViewInit {
  map: Map | undefined = undefined;
  mapConfig: MapConfig;
  searchArea: SearchArea;
  view: View = new View();

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private mapService: MapService,
    private flurstueckService: FlurstueckService,
    private locationService: LocationService,
    private searchAreaService: SearchAreaService
  ) {
    // Get init values for configs
    this.mapConfig = new MapConfig([], 0);
    this.searchArea = new SearchArea([], 0);

    // Update configs on change
    this.mapService.mapConfig$.subscribe((mapConfig: MapConfig) => {
      this.mapConfig = mapConfig;
    });
    this.mapService.searchArea$.subscribe(
      (searchArea: SearchArea) => (this.searchArea = searchArea)
    );
  }

  /**
   * This function is called after the view is initialized.
   * It initializes the map, the view, the layers, the location layer and the search area layer.
   * Furthermore, it refreshes the data in the map config object on changes and propagates it through the application
   */
  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    this.view = this.map?.getView()!;
    // add layers
    this.flurstueckService.initFlurstueckService(this.map, this.view);
    this.mapService.initLayers(this.map, this.view);
    this.locationService.initLocationService(this.map, this.view);
    this.searchAreaService.initSearchArea(this.map, this.view);
    this.view.on('change:resolution', () => {
      this.mapConfig.zoom = this.view.getZoom()!;
      this.mapService.mapConfig$.next(this.mapConfig);
    });
    this.view.on('change:center', () => {
      this.mapConfig.center = this.view.getCenter()!;
      this.mapService.mapConfig$.next(this.mapConfig);
    });
  }

  /**
   * Initialise the map with the config data from the map config object
   * Hint: if map config object is found in the local storage,
   * the state will be restored and the map will be centered to the previous, view extent.
   */
  private initMap(): void {
    this.view = new View({
      center: this.mapConfig.center,
      zoom: this.mapConfig.zoom,
    });

    this.map = new Map({
      layers: [],
      target: 'map',
      view: this.view,
      controls: [],
    });
  }
}
