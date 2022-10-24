import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { environment } from '../../../environments/environment';

export var RLP_ALKIS: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: environment.apiRLPKataster,
    params: { LAYERS: 'WMS_RP_ALKIS_Liegenschaften', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});
