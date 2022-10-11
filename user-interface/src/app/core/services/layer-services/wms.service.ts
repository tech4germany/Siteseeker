import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { MapService } from '../map.service';
import Map from 'ol/Map';

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

  rlpWMS_Hintergrund: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/kataster',
      params: { LAYERS: 'Hintergrund', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Umwelt: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp/umwelt',
      params: { LAYERS: 'Hintergrund', TILED: true },
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

  constructor() {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(this.rlpWMS_ALKIS);
    map?.addLayer(this.rlpWMS_Nutzung);
    map?.addLayer(this.rlpWMS_GebaeudeBauwerke);
    map?.addLayer(this.rlpWMS_Lagebezeichnungen);
    map?.addLayer(this.rlpWMS_Flurstueck);
    map?.addLayer(this.rlpWMS_Hintergrund);
    //    map?.addLayer(this.berlinWMS_ALKIS);
  }

  public toggleRLP_ALKIS(toggle: boolean) {
    this.rlpWMS_ALKIS.setVisible(toggle);
    //    this.berlinWMS_ALKIS.setVisible(toggle);
  }

  public toggleRLP_Nutzung(toggle: boolean) {
    this.rlpWMS_Nutzung.setVisible(!this.rlpWMS_Nutzung.getVisible());
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

  public toggleRLP_Hintergrund(toggle: boolean) {
    this.rlpWMS_Hintergrund.setVisible(toggle);
  }
}
