import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { BehaviorSubject } from 'rxjs';
import { Coordinate } from 'ol/coordinate';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private geolocation$: BehaviorSubject<Geolocation> = new BehaviorSubject(
    new Geolocation()
  );

  constructor() {}

  public initLocationService(map: Map | undefined, view: View) {
    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });

    this.geolocation$.next(geolocation);

    // handle geolocation error.
    geolocation.on('error', function (error) {});
    geolocation.setTracking(true);

    // Create ring like feature that shows the accuracy of location as a polygon
    // Also update the feature on change
    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      let geom = geolocation.getAccuracyGeometry();
      if (geom != null) {
        accuracyFeature.setGeometry(geom);
      }
    });

    // Create pin that shows the current location
    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    // Update the current position on change
    geolocation.on('change:position', function () {
      const coordinates: Coordinate | undefined = geolocation.getPosition();
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : undefined
      );
    });

    // Create layer for displaying current location
    const locationLayer = new VectorLayer({
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });

    // Add location layer to our map
    map?.addLayer(locationLayer);
  }

  public getLocationData(): BehaviorSubject<Geolocation> {
    return this.geolocation$;
  }
}
