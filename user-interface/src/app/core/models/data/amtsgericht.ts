export class Amtsgericht {
  private _amtsgerichtName?: string;
  private _strasse?: string;
  private _telefon?: string;
  private _ort?: string;
  private _e_mail?: string;
  private _xjustiz_id?: string;
  private _plz?: string;
  private _bundesland?: string;
  private _telefax?: string;
  private _webseite?: string;

  get amtsgerichtName(): string {
    return <string>this._amtsgerichtName;
  }

  set amtsgerichtName(value: string) {
    this._amtsgerichtName = value;
  }

  get strasse(): string {
    return <string>this._strasse;
  }

  set strasse(value: string) {
    this._strasse = value;
  }

  get telefon(): string {
    return <string>this._telefon;
  }

  set telefon(value: string) {
    this._telefon = value;
  }

  get ort(): string {
    return <string>this._ort;
  }

  set ort(value: string) {
    this._ort = value;
  }

  get e_mail(): string {
    return <string>this._e_mail;
  }

  set e_mail(value: string) {
    this._e_mail = value;
  }

  get xjustiz_id(): string {
    return <string>this._xjustiz_id;
  }

  set xjustiz_id(value: string) {
    this._xjustiz_id = value;
  }

  get plz(): string {
    return <string>this._plz;
  }

  set plz(value: string) {
    this._plz = value;
  }

  get bundesland(): string {
    return <string>this._bundesland;
  }

  set bundesland(value: string) {
    this._bundesland = value;
  }

  get telefax(): string {
    return <string>this._telefax;
  }

  set telefax(value: string) {
    this._telefax = value;
  }

  get webseite(): string {
    return <string>this._webseite;
  }

  set webseite(value: string) {
    this._webseite = value;
  }
}
