import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { environment } from '../../../../environments/environment';

export var rlpWMS_ALKIS: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
    params: { LAYERS: 'WMS_RP_ALKIS_Liegenschaften', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});

export var rlpWMS_Nutzung: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
    params: { LAYERS: 'Nutzung', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});

export var rlpWMS_GebaeudeBauwerke: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
    params: { LAYERS: 'GebaeudeBauwerke', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});

export var rlpWMS_Flurstueck: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
    params: { LAYERS: 'Flurstueck', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});

export var rlpWMS_Lagebezeichnungen: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
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

// TODO: Not working - fix
export var rlpWMS_Topo: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPTopo,
    params: {
      LAYERS: 'wms_rp_dtk25',
      TILED: true,
      OVERLAY: true,
      TRANSPARENT: true,
    },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: true,
});

// export var rlpWMS_Hintergrund: TileLayer<any> = new TileLayer({
//   source: new TileWMS({
//     url: 'apiRLPKataster',
//     params: { LAYERS: 'Hintergrund', TILED: true },
//     serverType: 'geoserver',
//     // Countries have transparency, so do not fade tiles:
//     transition: 0,
//   }),
//   visible: false,
// });

export var rlpWMS_Umwelt: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPUmwelt,
    params: { LAYERS: 'mywmsfile', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});

export var berlinWMS_ALKIS: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiBERKataster,
    params: { LAYERS: 'wmsk_alkis', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});
