import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';

export var rlpHintergrundLayer: TileLayer<any> = new TileLayer({
  source: new TileWMS({
    url: 'apiRLPKataster',
    params: { LAYERS: 'Hintergrund', TILED: true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  }),
  visible: false,
});
