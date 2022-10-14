import { Collection } from 'ol';
import BaseLayer from 'ol/layer/Base';
import { Coordinate } from 'ol/coordinate';

export class Project {
  id: number;
  layers: Collection<BaseLayer>;
  searchAreaCoordinate: Coordinate;
  searchAreaRadius: number;

  constructor(
    id: number,
    layers: Collection<BaseLayer>,
    searchAreaCoordinate: Coordinate,
    searchAreaRadius: number
  ) {
    this.id = id;
    this.layers = layers;
    this.searchAreaCoordinate = searchAreaCoordinate;
    this.searchAreaRadius = searchAreaRadius;
  }
}
