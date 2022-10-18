import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { BehaviorSubject } from 'rxjs';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { MapService } from '../map.service';

@Injectable({
  providedIn: 'root',
})
export class SatelliteService {
  satelliteLayer: TileLayer<any> = new TileLayer({
    source: new XYZ({
      // credits
      attributions: [
        'Powered by Esri',
        'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
      ],
      attributionsCollapsible: false,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
    visible: false,
  });

  constructor() {}

  public initSatelliteService(map: Map | undefined) {
    map?.addLayer(this.satelliteLayer);
  }

  public toggleSatelliteLayer(toggle: boolean) {
    this.satelliteLayer.setVisible(toggle);
  }
}
