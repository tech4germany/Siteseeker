import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import {
  rlpWMS_Umwelt,
  rlpWMS_Nutzung,
  rlpWMS_Flurstueck,
  rlpWMS_ALKIS,
  rlpWMS_Lagebezeichnungen,
  rlpWMS_GebaeudeBauwerke,
  berlinWMS_ALKIS,
} from './wms.layers';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  vectorSource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
      return (
        'https://geo5.service24.rlp.de/wfs/bodenschaetzung_rp.fcgi?' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox=' +
        extent.join(',') +
        ',EPSG:3857'
      );
    },
    strategy: bboxStrategy,
  });

  testWFS = new VectorLayer({
    source: this.vectorSource,
    style: {
      'stroke-width': 0.75,
      'stroke-color': 'white',
      'fill-color': 'rgba(100,100,100,0.25)',
    },
  });

  constructor() {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(rlpWMS_ALKIS);
    map?.addLayer(rlpWMS_Nutzung);
    map?.addLayer(rlpWMS_GebaeudeBauwerke);
    map?.addLayer(rlpWMS_Lagebezeichnungen);
    map?.addLayer(rlpWMS_Flurstueck);
    map?.addLayer(rlpWMS_Umwelt);
    map?.addLayer(this.testWFS);
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
