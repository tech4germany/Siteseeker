export class Gemeinde {
  private _gemeindeSchluessel?: number;
  private _gemeindeName?: string;
  private _gemeindeTyp?: string;

  get gemeindeSchluessel(): number {
    return <number>this._gemeindeSchluessel;
  }

  set gemeindeSchluessel(value: number) {
    this._gemeindeSchluessel = value;
  }

  get gemeindeName(): string {
    return <string>this._gemeindeName;
  }

  set gemeindeName(value: string) {
    this._gemeindeName = value;
  }

  get gemeindeTyp(): string {
    return <string>this._gemeindeTyp;
  }

  set gemeindeTyp(value: string) {
    this._gemeindeTyp = value;
  }
}
