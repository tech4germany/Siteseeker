import { Injectable, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import {
  rlpWMS_Umwelt,
  rlpWMS_Nutzung,
  rlpWMS_Flurstueck,
  rlpWMS_ALKIS,
  rlpWMS_Lagebezeichnungen,
  rlpWMS_GebaeudeBauwerke,
  berlinWMS_ALKIS,
} from './wms.layers';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import { environment } from '../../../../environments/environment';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  constructor() {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(rlpWMS_ALKIS);
    map?.addLayer(rlpWMS_Nutzung);
    map?.addLayer(rlpWMS_GebaeudeBauwerke);
    map?.addLayer(rlpWMS_Lagebezeichnungen);
    map?.addLayer(rlpWMS_Flurstueck);
    map?.addLayer(rlpWMS_Umwelt);
    //    map?.addLayer(this.berlinWMS_ALKIS);
  }

  public toggleRLP_ALKIS(toggle: boolean) {
    rlpWMS_ALKIS.setVisible(toggle);
    //    this.berlinWMS_ALKIS.setVisible(toggle);
  }

  public toggleRLP_Nutzung(toggle: boolean) {
    rlpWMS_Nutzung.setVisible(toggle);
  }

  public toggleRLP_GebaeudeBauwerke(toggle: boolean) {
    rlpWMS_GebaeudeBauwerke.setVisible(toggle);
  }

  public toggleRLP_Lagebzeichnungen(toggle: boolean) {
    rlpWMS_Lagebezeichnungen.setVisible(toggle);
  }

  public toggleRLP_Flurstuecke(toggle: boolean) {
    rlpWMS_Flurstueck.setVisible(toggle);
  }

  public toggleRLP_Umwelt(toggle: boolean) {
    rlpWMS_Umwelt.setVisible(toggle);
  }
}
