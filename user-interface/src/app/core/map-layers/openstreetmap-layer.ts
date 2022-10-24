import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export var openstreetmapLayer: TileLayer<any> = new TileLayer({
  source: new OSM({
    // default tile manager from OSM
    // https://tile.openstreetmap.org/{z}/{x}/{y}.png;
  }),
  visible: true,
});
