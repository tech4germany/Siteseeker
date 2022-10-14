import {
  Component,
  NgZone,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Map } from 'ol';

import { MapService } from '../../core/services/map.service';
import { LocationService } from '../../core/services/layer-services/location.service';
import { SatelliteService } from '../../core/services/layer-services/satellite.service';
import { OpenStreetMapService } from '../../core/services/layer-services/open-street-map.service';
import { SearchAreaService } from '../../core/services/layer-services/search-area.service';
import { CourtLayerService } from '../../core/services/layer-services/court-layer.service';
import { WmsService } from '../../core/services/layer-services/wms.service';
import { GemarkungenService } from '../../core/services/layer-services/gemarkungen.service';
import { MapConfig } from '../../core/models/mapconfig';
import { SearchArea } from '../../core/models/searcharea';
import View from 'ol/View';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  map: Map | undefined = undefined;
  mapConfig: MapConfig;
  searchArea: SearchArea;
  view: View = new View();

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private mapService: MapService,
    private locationService: LocationService,
    private satelliteService: SatelliteService,
    private osmService: OpenStreetMapService,
    private searchAreaService: SearchAreaService,
    private courtLayerService: CourtLayerService,
    private wmsService: WmsService,
    private wfsService: GemarkungenService
  ) {
    // Get init values for configs
    this.mapConfig = new MapConfig([], 0);
    this.searchArea = new SearchArea([], 0);

    // Update configs on change
    this.mapService.mapConfig$.subscribe((mapConfig: MapConfig) => {
      this.mapConfig = mapConfig;
      console.log('Map Comp Config', this.view);
    });
    this.mapService.searchArea$.subscribe(
      (searchArea: SearchArea) => (this.searchArea = searchArea)
    );
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    this.view = this.map?.getView()!;
    // add layers
    this.satelliteService.initSatelliteService(this.map);
    this.osmService.initOSMService(this.map);
    this.locationService.initLocationService(this.map, this.view);
    this.wmsService.initWMSService(this.map);
    this.wfsService.initGemarkungenService(this.map, this.view);
    //this.courtLayerService.initCourtLayerService(this.map, this.view);
    this.searchAreaService.initSearchArea(this.map, this.view);
  }

  private initMap(): void {
    this.view = new View({
      center: this.searchArea.coordinate,
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
