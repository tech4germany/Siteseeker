import { Map } from 'ol';
import { Control } from 'ol/control';

export class SidebarControl extends Control {
  map!: Map;
  constructor(map: Map) {
    let arrowRight = document.createElement('button');
    arrowRight.innerHTML = '&#8594;';
    let elem = document.createElement('div');
    elem.className = 'right ol-control';
    elem.append(arrowRight);

    super({
      element: elem,
    });
    this.map = map;
    elem.addEventListener('click', this.handleRightArrow.bind(this), false);
  }

  handleRightArrow() {
    let center: number[] = this.map.getView().getCenter()!;
    this.map
      .getView()
      .setCenter([
        center[0] + 100 * this.map.getView().getResolution()!,
        center[1],
      ]);
  }
}
