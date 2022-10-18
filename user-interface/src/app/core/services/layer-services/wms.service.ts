import { Injectable, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import {
  rlpWMS_Umwelt,
  rlpWMS_Flurstueck,
  rlpWMS_GebaeudeBauwerke,
  rlpWMS_Topo,
} from './wms.layers';
import { Layer } from 'ol/layer';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  constructor() {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(rlpWMS_Umwelt);
    map?.addLayer(rlpWMS_GebaeudeBauwerke);
    map?.addLayer(rlpWMS_Flurstueck);
    //map?.addLayer(rlpWMS_Topo);
  }

  public toggleLayer(toggle: boolean, layer: Layer) {
    layer.setVisible(toggle);
  }
}
