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
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
// import Projection from 'ol/proj/Projection';
// import { get as GetProjection } from 'ol/proj';
// import { Extent } from 'ol/extent';
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
  // ol.proj.transform transforms from EPSG:4326 to EPSG:3857, i.e. from [lat, lon] to [x, y], and vice versa
  // the coordinate system is defined by the map that is being used
  private center: Coordinate = proj.transform([13.40940990769482, 52.520831598904365], "EPSG:4326", "EPSG:3857"); // Berliner Fernsehturm
  private zoom: number = 17;
  view: View = new View();
  // projection: Projection | null = null;
  // extent: Extent = [-180, -90, 180, 90] // [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
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
