export class Flur {
  private _flurNummer?: number;
  private _flurName?: string;

  get flurNummer(): number {
    return <number>this._flurNummer;
  }

  set flurNummer(value: number) {
    this._flurNummer = value;
  }

  get flurName(): string {
    return <string>this._flurName;
  }

  set flurName(value: string) {
    this._flurName = value;
  }
}
