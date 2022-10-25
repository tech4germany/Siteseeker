import { Injectable } from '@angular/core';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { MapService } from '../utility-services/map.service';
import Map from 'ol/Map';
import { Feature, View } from 'ol';
import { Circle, Point } from 'ol/geom';
import { Fill, Icon, Style } from 'ol/style';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import { fromCircle, fromExtent } from 'ol/geom/Polygon';
import { SearchArea } from '../../models/config/searcharea';

@Injectable({
  providedIn: 'root',
})
/**
 *  This service is responsible for the creation of the visual search area feature.
 *
 *  Disclaimer: It does NOT manage the search area object, this is managed in the map service.
 */
export class SearchAreaService {
  private searchArea: SearchArea;

  constructor(private mapService: MapService) {
    this.searchArea = new SearchArea([], 0);

    this.mapService.searchArea$.subscribe(
      (searchArea: SearchArea) => (this.searchArea = searchArea)
    );
  }

  /**
   * Creates a layer with a circular search area around the search coordinate and
   * another layer with a pin at the search coordinate
   *
   * @param {Map | undefined} map - Map | undefined - the map object
   * @param {View} view - View - the map's view
   */
  public initSearchArea(map: Map | undefined, view: View) {
    // layer with pin at search coordinate
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

    const searchCoordinateLayer = new VectorLayer({
      source: new VectorSource({
        features: [pinFeature],
      }),
    });

    // layer with circular search area around pin coordinate
    const resolutionAtEquator = view.getResolution() ?? 1;
    const pointResolution = view.getProjection().getPointResolutionFunc()(
      resolutionAtEquator,
      this.searchArea.coordinate
    );
    const resolutionFactor = resolutionAtEquator / (pointResolution ?? 1);
    const radius: number =
      (this.searchArea.radius / METERS_PER_UNIT.m) * resolutionFactor;

    // define the search area and extract its shape polygon
    const searchAreaPolygon = fromCircle(
      new Circle(this.searchArea.coordinate, radius),
      64 // number of line elements that construct the circle
    );

    // the layer should cover the whole view except for the search area
    let viewExtent = fromExtent(view.getProjection().getExtent());

    // cut out the search area from the layer by appending its linear ring shape to the extent polygon
    const searchAreaLinearRing = searchAreaPolygon.getLinearRing(0);
    viewExtent.appendLinearRing(searchAreaLinearRing!);

    const searchAreaLayer = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({ geometry: viewExtent })],
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.5)',
        }),
      }),
    });

    // set layering of the layers to be on top of everything else
    searchAreaLayer.setZIndex(999);
    searchCoordinateLayer.setZIndex(1000);

    // add layers to map
    map?.addLayer(searchAreaLayer);
    map?.addLayer(searchCoordinateLayer);
  }
}
