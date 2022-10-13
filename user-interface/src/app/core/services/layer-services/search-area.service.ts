import { Injectable } from '@angular/core';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { MapService } from '../map.service';
import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import { Feature, View } from 'ol';
import { Circle, Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { fromExtent } from 'ol/geom/Polygon';

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

    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number = (this.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleFeature = new Feature({
      geometry: new Circle(this.coordinate, radius),
      style: new Style({
        fill: new Fill({
          color: 'rgba(0,0,0,0)',
        }),
      }),
    });

    const searchCoordinateLayer = new VectorLayer({
      source: new VectorSource({
        features: [pinFeature],
      }),
    });

    // define layer with clipped search area
    // https://openlayers.org/en/latest/examples/layer-clipping-vector.html
    // https://stackoverflow.com/questions/63672199/openlayers-add-a-solid-coloured-layer-as-overlay
    let viewExtent= fromExtent(view.getProjection().getExtent());
    let extentFeature = new Feature({geometry: viewExtent});

    const searchAreaLayer = new VectorLayer({
      source: new VectorSource({
        features: [extentFeature]
        }) ,
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
