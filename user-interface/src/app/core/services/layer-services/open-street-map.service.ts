import { Injectable } from '@angular/core';
import { MapService } from '../map.service';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

@Injectable({
  providedIn: 'root',
})
export class OpenStreetMapService {
  osmLayer: TileLayer<any> = new TileLayer({
    source: new OSM({
      // default tile manager from OSM
      // https://tile.openstreetmap.org/{z}/{x}/{y}.png;
    }),
    visible: false,
  });

  constructor(private mapService: MapService) {
    this.mapService.getSatelliteSwitch().subscribe((ss: boolean) => {
      this.osmLayer.setVisible(!ss);
    });
  }

  public initOSMService(map: Map | undefined) {
    map?.addLayer(this.osmLayer);
    console.log(map?.getLayers());
  }

  public toggleOSMLayer() {
    this.osmLayer.setVisible(!this.osmLayer.getVisible());
  }
}
