export class Verbandsgemeinde {
  private _verbandsgemeindeNummer?: number;
  private _verbandsgemeindeName?: string;

  get verbandsgemeindeNummer(): number {
    return <number>this._verbandsgemeindeNummer;
  }

  set verbandsgemeindeNummer(value: number) {
    this._verbandsgemeindeNummer = value;
  }

  get verbandsgemeindeName(): string {
    return <string>this._verbandsgemeindeName;
  }

  set verbandsgemeindeName(value: string) {
    this._verbandsgemeindeName = value;
  }
}
