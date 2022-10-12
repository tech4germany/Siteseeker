import { Injectable } from '@angular/core';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { environment } from '../../../../environments/environment';
import { bbox } from 'ol/loadingstrategy';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { Circle } from 'ol/geom';
import { MapService } from '../map.service';
import { Coordinate } from 'ol/coordinate';
import View from 'ol/View';

@Injectable({
  providedIn: 'root',
})
export class WfsService {
  private radius: number = 1;

  private coordinate: Coordinate = [];

  constructor(private mapService: MapService) {
    this.mapService
      .getRadius()
      .subscribe((newRadius: number) => (this.radius = newRadius));
    this.mapService
      .getCoordinate()
      .subscribe(
        (newCoordinate: Coordinate) => (this.coordinate = newCoordinate)
      );
  }

  public initWMSService(map: Map | undefined, view: View) {
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number = (this.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleGeometry = new Circle(this.coordinate, radius);

    let vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          environment.apiRLPwfs +
          '?service=WFS&' +
          'version=1.1.0&' +
          'request=GetFeature&' +
          'typename=vermkv:fluren_rlp&' +
          'outputFormat=geojson&' +
          'format_options=callback:loadFeaturesFixed&' +
          'srsname=EPSG:3857&' +
          'bbox=' +
          extent.join(',') +
          ',EPSG:3857'
        );
      },
      strategy: function (extent) {
        return [extent];
      },
    });

    let testWFS = new VectorLayer({
      source: vectorSource,
      style: {
        'stroke-width': 0.75,
        'stroke-color': 'white',
        'fill-color': 'rgba(100,100,100,0.25)',
      },
    });

    testWFS.setExtent(circleGeometry.getExtent());

    //map?.addLayer(testWFS);
  }
}
