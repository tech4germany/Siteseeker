import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import * as proj from 'ol/proj';
import { View, Map } from 'ol';
import { Coordinate, createStringXY } from 'ol/coordinate';

import MousePosition from 'ol/control/MousePosition';
import { MapService } from '../../core/services/map.service';
import { LocationService } from '../../core/services/layer-services/location.service';
import { SatelliteService } from '../../core/services/layer-services/satellite.service';
import { OpenStreetMapService } from '../../core/services/layer-services/open-street-map.service';
import { SearchAreaService } from '../../core/services/layer-services/search-area.service';
import { CourtLayerService } from '../../core/services/layer-services/court-layer.service';
import { WmsService } from '../../core/services/layer-services/wms.service';
import { WfsService } from '../../core/services/layer-services/wfs.service';

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  // className: 'custom-mouse-position',
  // target: document.getElementById('mouse-position'),
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  // ol.proj.transform transforms from EPSG:4326 to EPSG:3857, i.e. from [lon, lat] to [x, y], and vice versa
  // the coordinate system is defined by the map that is being used
  private center: Coordinate = proj.transform(
    [0.0, 0.0],
    'EPSG:4326',
    'EPSG:3857'
  ); // Berliner Fernsehturm
  private zoom: number = 15.5;
  private radius: number = 1;
  view: View = new View();
  map: Map | undefined = undefined;

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
    private wfsService: WfsService
  ) {
    this.mapService
      .getCoordinate()
      .subscribe((coordinate: Coordinate) => (this.center = coordinate));
    this.mapService
      .getRadius()
      .subscribe((radius: number) => (this.radius = radius));
    this.mapService.getZoom().subscribe(zoom => {
      this.zoom = zoom;
    });
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    // add layers
    this.satelliteService.initSatelliteService(this.map);
    this.osmService.initOSMService(this.map);
    this.locationService.initLocationService(this.map, this.view);
    this.wmsService.initWMSService(this.map);
    this.wfsService.initWMSService(this.map, this.view);
    //this.courtLayerService.initCourtLayerService(this.map, this.view);
    this.searchAreaService.initSearchArea(this.map, this.view);

    this.map?.on('moveend', () => {
      this.mapService.setZoom(this.view.getZoom()!);
    });
  }

  private initMap(): void {
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
    });
    this.map = new Map({
      layers: [],
      target: 'map',
      view: this.view,
      controls: [],
    });
  }
}
