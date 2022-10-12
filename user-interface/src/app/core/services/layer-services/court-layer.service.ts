import { Injectable } from '@angular/core';
import { CourtService } from '../court.service';
import { Court, Fields, Geom, Geometry } from '../../models/court';
import { Feature, View } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import * as proj from 'ol/proj';
import { GeoJSON } from 'ol/format';
import { geojsonObject } from '../../../../assets/geodata/amtsgerichte-in-deutschland';
import { Icon, Style } from 'ol/style';

@Injectable({
  providedIn: 'root',
})
export class CourtLayerService {
  courts: Court[] = [
    new Court(
      '',
      '',
      new Fields(
        [],
        '',
        '',
        '',
        '',
        new Geom([], ''),
        '',
        '',
        '',
        '',
        '',
        '',
        []
      ),
      new Geometry('', []),
      ''
    ),
  ];

  constructor(private courtService: CourtService) {}

  public initCourtLayerService(map: Map | undefined, view: View) {
    this.courtService.getCourtsObservable().subscribe(courts => {
      this.courts = courts;

      let features: Feature[] = [];

      this.courts.forEach((court: Court) => {
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

        const pinFeature: Feature = new Feature({
          geometry: new Point(court.geometry.coordinates),
        });

        pinFeature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1',
            }),
          })
        );

        //  features.push(pinFeature);
      });

      console.log(features);

      const searchAreaLayer = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      });

      map?.addLayer(searchAreaLayer);
    });
  }
}
