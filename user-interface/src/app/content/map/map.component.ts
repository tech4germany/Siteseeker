import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { View, Feature, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import proj4 from 'proj4';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';
import { get as GetProjection } from 'ol/proj';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS, XYZ } from 'ol/source';
import { SidebarControl } from './custom-controls/sidebar-control';
import { Layer } from 'ol/layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private center: Coordinate = [52.502339682808056, 13.413504442645158];
  private zoom: number = 8.5;
  view: View = new View();
  projection: Projection | null = null;
  extent: Extent = [-20037508.34, -20048966.1, 20037508.34, 20048966.1];
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
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );

    register(proj4);
    this.projection = GetProjection('EPSG:3857');
    if (this.projection !== null) {
      this.projection.setExtent(this.extent);
      this.view = new View({
        center: this.center,
        zoom: this.zoom,
        projection: this.projection,
      });
      this.Map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              attributions: [
                'Powered by Esri',
                'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
              ],
              attributionsCollapsible: false,
              url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              maxZoom: 24,
            }),
          }) /*new TileLayer({
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
        controls: DefaultControls().extend([new ScaleLine({})]),
      });
    }
  }
}
