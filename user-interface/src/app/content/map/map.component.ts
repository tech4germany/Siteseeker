import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import * as proj from 'ol/proj';
import { View, Feature, Map } from 'ol';
import { Coordinate, createStringXY } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
// import Projection from 'ol/proj/Projection';
// import { get as GetProjection } from 'ol/proj';
// import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS, XYZ, Vector } from 'ol/source';
import { SidebarControl } from './custom-controls/sidebar-control';
import { Layer } from 'ol/layer';

import MousePosition from 'ol/control/MousePosition';
import { MapService } from '../../core/services/map.service';
import { coordinates } from 'ol/geom/flat/reverse';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { LocationService } from '../../core/services/layer-services/location.service';
import { SatelliteService } from '../../core/services/layer-services/satellite.service';
import { OpenStreetMapService } from '../../core/services/layer-services/open-street-map.service';
import { SearchAreaService } from '../../core/services/layer-services/search-area.service';
import { CourtLayerService } from '../../core/services/layer-services/court-layer.service';

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
    [13.40940990769482, 52.520831598904365],
    'EPSG:4326',
    'EPSG:3857'
  ); // Berliner Fernsehturm
  private zoom: number = 15;
  private radius: number = 1;
  view: View = new View();
  map: Map | undefined = undefined;
  @Output() mapReady = new EventEmitter<Map>();

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private mapService: MapService,
    private locationService: LocationService,
    private satelliteService: SatelliteService,
    private osmService: OpenStreetMapService,
    private searchAreaService: SearchAreaService,
    private courtLayerService: CourtLayerService
  ) {
    this.mapService
      .getCoordinate()
      .subscribe((coordinate: Coordinate) => (this.center = coordinate));
    this.mapService
      .getRadius()
      .subscribe((radius: number) => (this.radius = radius));
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));

    // add layers
    this.satelliteService.initSatelliteService(this.map);
    this.osmService.initOSMService(this.map);
    this.locationService.initLocationService(this.map, this.view);
    this.searchAreaService.initSearchArea(this.map, this.view);
    this.courtLayerService.initCourtLayerService(this.map, this.view);
  }

  private initMap(): void {
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
    });
    this.map = new Map({
      layers: [
        // source for raster tile managers: https://wiki.openstreetmap.org/wiki/Raster_tile_providers
        new TileLayer({
          source: new OSM({
            // watercolor map
            url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
          }),
          visible: false,
        }),

        /*new TileLayer({
          source: new TileWMS({
            url: 'https://fbinter.stadt-berlin.de/fb/wms/senstadt/wmsk_alkis',
            params: { LAYERS: 'simple', TILED: true },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),*/
      ],
      target: 'map',
      view: this.view,
      controls: [],
    });
  }
}
