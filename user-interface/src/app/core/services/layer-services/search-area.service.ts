import { Injectable } from '@angular/core';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { MapService } from '../map.service';
import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import { Feature, View } from 'ol';
import { Circle, Point } from 'ol/geom';
import { Fill, Icon, Style } from 'ol/style';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { fromCircle, fromExtent } from 'ol/geom/Polygon';

@Injectable({
  providedIn: 'root',
})
export class SearchAreaService {
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

  public initSearchArea(map: Map | undefined, view: View) {

    // layer with pin at search coordinate
    const pinFeature = new Feature({
      geometry: new Point(this.coordinate),
    });
    pinFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1',
        }),
      })
    );

    const searchCoordinateLayer = new VectorLayer({
      source: new VectorSource({
        features: [pinFeature],
      }),
    });

    // layer with circular search area around pin coordinate
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number = (this.radius / METERS_PER_UNIT.m) * resolutionFactor;

    // define the search area and extract its shape polygon
    const searchAreaPolygon = fromCircle(
      new Circle(this.coordinate, radius),
      64  // number of line elements that construct the circle
    )

    // the layer should cover the whole view except for the search area
    let viewExtent = fromExtent(view.getProjection().getExtent());

    // cut out the search area from the layer by appending its linear ring shape to the extent polygon
    const searchAreaLinearRing= searchAreaPolygon.getLinearRing(0)
    viewExtent.appendLinearRing(searchAreaLinearRing!)

    const searchAreaLayer = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({geometry: viewExtent})]
      }),
      style: new Style({
          fill: new Fill({
            color:"rgba(0, 0, 0, 0.5)"
        })
      })
    });

    // add layers to map
    map?.addLayer(searchAreaLayer);
    map?.addLayer(searchCoordinateLayer);
  }
}
