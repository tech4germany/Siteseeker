import { Court } from '../models/data/court';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import * as proj from 'ol/proj';

export function getCourtLayer(courts: Court[]) {
  let features: Feature[] = [];

  courts.forEach((court: Court) => {
    let coordinates: Coordinate[][] = [[]];
    if (court.fields.geom !== undefined) {
      court.fields.geom.coordinates[0].forEach(coord =>
        coordinates[0].push(proj.transform(coord, 'EPSG:4326', 'EPSG:3857'))
      );
    }
    const feature: Feature = new Feature({
      geometry: new Polygon(coordinates),
    });
    features.push(feature);
  });

  return new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
  });
}
