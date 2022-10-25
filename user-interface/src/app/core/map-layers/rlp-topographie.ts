// TODO: Not working - fix
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { environment } from '../../../environments/environment';

export var rlpTopographieLayer: TileLayer<any> = new TileLayer({
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
