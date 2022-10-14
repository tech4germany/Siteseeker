import { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import { Address } from './address';
import { GeoJSON } from 'ol/format';

export class SearchArea {
  private _inputCoordinate: Coordinate;
  private _coordinate: Coordinate;
  private _radius: number;
  private _address: Address;

  private _gemarkungen?: GeoJSON;

  constructor(inputCoordinate: Coordinate, radius: number) {
    this._inputCoordinate = inputCoordinate;
    this._coordinate = proj.transform(
      inputCoordinate,
      'EPSG:4326',
      'EPSG:3857'
    );
    this._radius = radius;
    this._address = new Address(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  get inputCoordinate(): Coordinate {
    return this._inputCoordinate;
  }

  set inputCoordinate(value: Coordinate) {
    this._inputCoordinate = value;
    this._coordinate = proj.transform(value, 'EPSG:4326', 'EPSG:3857');
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  get coordinate(): Coordinate {
    return this._coordinate;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  getGemarkungen(): GeoJSON | undefined {
    return this._gemarkungen;
  }

  setGemarkungen(value: GeoJSON) {
    this._gemarkungen = value;
  }
}
