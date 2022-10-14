import { Injectable } from '@angular/core';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { MapService } from '../map.service';
import Map from 'ol/Map';
import { View } from 'ol';
import { SearchArea } from '../../models/searcharea';
import { MapConfig } from '../../models/mapconfig';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Fill, Icon, Style } from 'ol/style';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { Circle } from 'ol/geom';

@Injectable({
  providedIn: 'root',
})
export class SearchAreaService {
  private searchArea: SearchArea;

  constructor(private mapService: MapService) {
    this.searchArea = new SearchArea([], 0);

    this.mapService.searchArea$.subscribe(
      (searchArea: SearchArea) => (this.searchArea = searchArea)
    );
  }

  public initSearchArea(map: Map | undefined, view: View) {
    const pinFeature = new Feature({
      geometry: new Point(this.searchArea.coordinate),
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
      this.searchArea.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number =
      (this.searchArea.radius / METERS_PER_UNIT.m) * resolutionFactor;

    const circleFeature = new Feature({
      geometry: new Circle(this.searchArea.coordinate, radius),
    });

    const searchCoordinateLayer = new VectorLayer({
      source: new VectorSource({
        features: [pinFeature],
      }),
    });
    const searchAreaLayer = new VectorLayer({
      source: new VectorSource({
        features: [circleFeature],
      }),
    });
    map?.addLayer(searchAreaLayer);
    map?.addLayer(searchCoordinateLayer);
  }
}
