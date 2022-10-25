export class Katasteramt {
  private _katasteramtName?: string;
  private _katasterNummer?: number;

  get katasterNummer(): number {
    return <number>this._katasterNummer;
  }

  set katasterNummer(value: number) {
    this._katasterNummer = value;
  }

  get katasteramtName(): string {
    return <string>this._katasteramtName;
  }

  set katasteramtName(value: string) {
    this._katasteramtName = value;
  }
}
