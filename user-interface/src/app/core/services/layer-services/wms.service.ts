import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { MapService } from '../map.service';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  rlpWMS_ALKIS: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: { LAYERS: 'WMS_RP_ALKIS_Liegenschaften', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Nutzung: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: { LAYERS: 'Nutzung', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_GebaeudeBauwerke: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: { LAYERS: 'GebaeudeBauwerke', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Flurstueck: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: { LAYERS: 'Flurstueck', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Lagebezeichnungen: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: {
        LAYERS: 'Lagebezeichnungen',
        TILED: true,
        OVERLAY: true,
        TRANSPARENT: true,
      },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  // rlpWMS_Hintergrund: TileLayer<any> = new TileLayer({
  //   source: new TileWMS({
  //     url: '/rlp/kataster',
  //     params: { LAYERS: 'Hintergrund', TILED: true },
  //     serverType: 'geoserver',
  //     // Countries have transparency, so do not fade tiles:
  //     transition: 0,
  //   }),
  //   visible: false,
  // });

  rlpWMS_Umwelt: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/umwelt',
      params: { LAYERS: 'mywmsfile', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  berlinWMS_ALKIS: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/berlin/kataster',
      params: { LAYERS: 'wmsk_alkis', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

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
    map?.addLayer(this.rlpWMS_ALKIS);
    map?.addLayer(this.rlpWMS_Nutzung);
    map?.addLayer(this.rlpWMS_GebaeudeBauwerke);
    map?.addLayer(this.rlpWMS_Lagebezeichnungen);
    map?.addLayer(this.rlpWMS_Flurstueck);
    map?.addLayer(this.rlpWMS_Umwelt);
    map?.addLayer(this.testWFS);
    //    map?.addLayer(this.berlinWMS_ALKIS);
  }

  public toggleRLP_ALKIS(toggle: boolean) {
    this.rlpWMS_ALKIS.setVisible(toggle);
    //    this.berlinWMS_ALKIS.setVisible(toggle);
  }

  public toggleRLP_Nutzung(toggle: boolean) {
    this.rlpWMS_Nutzung.setVisible(toggle);
  }

  public toggleRLP_GebaeudeBauwerke(toggle: boolean) {
    this.rlpWMS_GebaeudeBauwerke.setVisible(toggle);
  }

  public toggleRLP_Lagebzeichnungen(toggle: boolean) {
    this.rlpWMS_Lagebezeichnungen.setVisible(toggle);
  }

  public toggleRLP_Flurstuecke(toggle: boolean) {
    this.rlpWMS_Flurstueck.setVisible(toggle);
  }

  public toggleRLP_Umwelt(toggle: boolean) {
    this.rlpWMS_Umwelt.setVisible(toggle);
  }
}
