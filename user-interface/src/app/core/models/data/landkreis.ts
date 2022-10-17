export class Landkreis {
  private _kreisSchluessel?: number;
  private _kreisName?: string;
  private _kreisTyp?: string;

  get kreisSchluessel(): number {
    return <number>this._kreisSchluessel;
  }

  set kreisSchluessel(value: number) {
    this._kreisSchluessel = value;
  }

  get kreisName(): string {
    return <string>this._kreisName;
  }

  set kreisName(value: string) {
    this._kreisName = value;
  }

  get kreisTyp(): string {
    return <string>this._kreisTyp;
  }

  set kreisTyp(value: string) {
    this._kreisTyp = value;
  }
}
