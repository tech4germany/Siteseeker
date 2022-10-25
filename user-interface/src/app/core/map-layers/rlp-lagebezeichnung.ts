import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { environment } from '../../../environments/environment';

export var rlpLagebezeichnungenLayer: TileLayer<any> = new TileLayer({
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
