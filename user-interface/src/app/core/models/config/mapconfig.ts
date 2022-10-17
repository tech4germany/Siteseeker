import { Coordinate } from 'ol/coordinate';
import View from 'ol/View';

export class MapConfig {
  private _center: Coordinate;
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
