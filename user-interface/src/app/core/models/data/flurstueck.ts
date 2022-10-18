export class Flurstueck {
  private _status?: string;
  private _kennzeichen?: string;
  private _nummer?: string;
  private _land?: string;
  private _gemarkung?: string;
  private _flur?: string;
  private _zaehler?: string;
  private _nenner?: string;
  private _ostwert?: string;
  private _nordwert?: string;
  private _gemarkung_bezeichnung?: string;
  private _gemeinde_schluessel?: string;
  private _gemeinde_bezeichnung?: string;
  private _kreis_schluessel?: string;
  private _kreis_bezeichnung?: string;
  private _vermka_schluessel?: string;
  private _vermka_bezeichnung?: string;
  private _vorgaenger_flurstuecke?: string;
  private _nachfolger_flurstuecke?: string;
  private _lage?: string;

  get status(): string {
    return <string>this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get kennzeichen(): string {
    return <string>this._kennzeichen;
  }

  set kennzeichen(value: string) {
    this._kennzeichen = value;
  }

  get nummer(): string {
    return <string>this._nummer;
  }

  set nummer(value: string) {
    this._nummer = value;
  }

  get land(): string {
    return <string>this._land;
  }

  set land(value: string) {
    this._land = value;
  }

  get gemarkung(): string {
    return <string>this._gemarkung;
  }

  set gemarkung(value: string) {
    this._gemarkung = value;
  }

  get flur(): string {
    return <string>this._flur;
  }

  set flur(value: string) {
    this._flur = value;
  }

  get zaehler(): string {
    return <string>this._zaehler;
  }

  set zaehler(value: string) {
    this._zaehler = value;
  }

  get nenner(): string {
    return <string>this._nenner;
  }

  set nenner(value: string) {
    this._nenner = value;
  }

  get ostwert(): string {
    return <string>this._ostwert;
  }

  set ostwert(value: string) {
    this._ostwert = value;
  }

  get nordwert(): string {
    return <string>this._nordwert;
  }

  set nordwert(value: string) {
    this._nordwert = value;
  }

  get gemarkung_bezeichnung(): string {
    return <string>this._gemarkung_bezeichnung;
  }

  set gemarkung_bezeichnung(value: string) {
    this._gemarkung_bezeichnung = value;
  }

  get gemeinde_schluessel(): string {
    return <string>this._gemeinde_schluessel;
  }

  set gemeinde_schluessel(value: string) {
    this._gemeinde_schluessel = value;
  }

  get gemeinde_bezeichnung(): string {
    return <string>this._gemeinde_bezeichnung;
  }

  set gemeinde_bezeichnung(value: string) {
    this._gemeinde_bezeichnung = value;
  }

  get kreis_schluessel(): string {
    return <string>this._kreis_schluessel;
  }

  set kreis_schluessel(value: string) {
    this._kreis_schluessel = value;
  }

  get kreis_bezeichnung(): string {
    return <string>this._kreis_bezeichnung;
  }

  set kreis_bezeichnung(value: string) {
    this._kreis_bezeichnung = value;
  }

  get vermka_schluessel(): string {
    return <string>this._vermka_schluessel;
  }

  set vermka_schluessel(value: string) {
    this._vermka_schluessel = value;
  }

  get vermka_bezeichnung(): string {
    return <string>this._vermka_bezeichnung;
  }

  set vermka_bezeichnung(value: string) {
    this._vermka_bezeichnung = value;
  }

  get vorgaenger_flurstuecke(): string {
    return <string>this._vorgaenger_flurstuecke;
  }

  set vorgaenger_flurstuecke(value: string) {
    this._vorgaenger_flurstuecke = value;
  }

  get nachfolger_flurstuecke(): string {
    return <string>this._nachfolger_flurstuecke;
  }

  set nachfolger_flurstuecke(value: string) {
    this._nachfolger_flurstuecke = value;
  }

  get lage(): string {
    return <string>this._lage;
  }

  set lage(value: string) {
    this._lage = value;
  }
}
