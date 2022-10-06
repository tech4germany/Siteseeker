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
import { OSM, TileWMS, XYZ } from 'ol/source';
import { SidebarControl } from './custom-controls/sidebar-control';
import { Layer } from 'ol/layer';

import MousePosition from 'ol/control/MousePosition';

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
  // ol.proj.transform transforms from EPSG:4326 to EPSG:3857, i.e. from [lat, lon] to [x, y], and vice versa
  // the coordinate system is defined by the map that is being used
  private center: Coordinate = proj.transform([13.40940990769482, 52.520831598904365], "EPSG:4326", "EPSG:3857"); // Berliner Fernsehturm
  private zoom: number = 17;
  view: View = new View();
  Map: Map | undefined = undefined;
  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.Map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.Map));

    this.Map?.addControl(new SidebarControl(this.Map));
  }

  private initMap(): void {
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
    });

    this.Map = new Map({
      layers: [
        // source for raster tile managers: https://wiki.openstreetmap.org/wiki/Raster_tile_providers 
        new TileLayer({
          source: new XYZ({
            // credits
            attributions: [
              'Powered by Esri',
              'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            ],
            attributionsCollapsible: false,
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 24,
          }),
          visible: false,
        }),
        new TileLayer({
          source: new OSM({
            // default tile manager from OSM
            // https://tile.openstreetmap.org/{z}/{x}/{y}.png;

          }),
          visible: true,
        }),
        new TileLayer({
          source: new OSM({
            // watercolor map
            url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
          }),
          visible: false,
        })
        
        /*new TileLayer({
          source: new TileWMS({
            url: 'https://fbinter.stadt-berlin.de/fb/wms/senstadt/wmsk_alkis',
            params: { LAYERS: 'simple', TILED: true },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),*/,
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([new ScaleLine({})]).extend([mousePositionControl]),
    });
  }
}

