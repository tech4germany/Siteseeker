import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { MapService } from '../map.service';
import Map from 'ol/Map';

@Injectable({
  providedIn: 'root',
})
export class WmsService {
  rlpWMS_ALKISLiegenschaften: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'WMS_RP_ALKIS_Liegenschaften', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Nutzung: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'Nutzung', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_GebaeudeBauwerke: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'GebaeudeBauwerke', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Flurstueck: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'Flurstueck', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Lagebezeichnungen: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'Lagebezeichnungen', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  rlpWMS_Hintergrund: TileLayer<any> = new TileLayer({
    source: new TileWMS({
      url: '/rlp',
      params: { LAYERS: 'Hintergrund', TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    visible: false,
  });

  constructor(private mapService: MapService) {}

  public initWMSService(map: Map | undefined) {
    map?.addLayer(this.rlpWMS_ALKISLiegenschaften);
    map?.addLayer(this.rlpWMS_Nutzung);
    map?.addLayer(this.rlpWMS_GebaeudeBauwerke);
    map?.addLayer(this.rlpWMS_Lagebezeichnungen);
    map?.addLayer(this.rlpWMS_Flurstueck);
    map?.addLayer(this.rlpWMS_Hintergrund);
  }

  public toggleRLP_ALKIS() {
    this.rlpWMS_ALKISLiegenschaften.setVisible(
      !this.rlpWMS_ALKISLiegenschaften.getVisible()
    );
  }

  public toggleRLP_Nutzung() {
    this.rlpWMS_Nutzung.setVisible(!this.rlpWMS_Nutzung.getVisible());
  }

  public toggleRLP_GebaeudeBauwerke() {
    this.rlpWMS_GebaeudeBauwerke.setVisible(
      !this.rlpWMS_GebaeudeBauwerke.getVisible()
    );
  }

  public toggleRLP_Lagebzeichnungen() {
    this.rlpWMS_Lagebezeichnungen.setVisible(
      !this.rlpWMS_Lagebezeichnungen.getVisible()
    );
  }

  public toggleRLP_Flurstuecke() {
    this.rlpWMS_Flurstueck.setVisible(!this.rlpWMS_Flurstueck.getVisible());
  }

  public toggleRLP_Hintergrund() {
    this.rlpWMS_Hintergrund.setVisible(!this.rlpWMS_Hintergrund.getVisible());
  }
}
