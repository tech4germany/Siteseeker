import { Coordinate } from 'ol/coordinate';

/**
 * The configuration object for the map.
 * Using a custom object for this and not the open layers view object to easily persist the map state in local storage.
 */
export class MapConfig {
  /* The current center of the map */
  private _center: Coordinate;

  /* The current zoom level of the map */
  private _zoom: number;

  constructor(center: Coordinate, zoom: number) {
    this._center = center;
    this._zoom = zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
  }

  get center(): Coordinate {
    return this._center;
  }

  set center(value: Coordinate) {
    this._center = value;
  }

  get zoom(): number {
    return this._zoom;
  }
}
