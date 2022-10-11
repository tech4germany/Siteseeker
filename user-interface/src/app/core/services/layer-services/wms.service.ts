import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { MapService } from '../map.service';
import Map from 'ol/Map';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  rlpWMSLayer: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'Flurstueck', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: true,
  });

  constructor(private mapService: MapService) {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(this.rlpWMSLayer);
  }
}
