import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

export var satelliteLayer: TileLayer<any> = new TileLayer({
  source: new XYZ({
    // credits
    attributions: [
      'Powered by Esri',
      'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
    ],
    attributionsCollapsible: false,
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  }),
  visible: false,
});
