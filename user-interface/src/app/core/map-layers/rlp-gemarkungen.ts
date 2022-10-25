import VectorLayer from 'ol/layer/Vector';
import { Stroke, Style } from 'ol/style';

export var rlpGemarkungenLayer = new VectorLayer({
  visible: false,
  style: new Style({
    stroke: new Stroke({
      color: 'black',
    }),
  }),
});
