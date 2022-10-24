import { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import { Address } from '../data/address';
import { GeoJSON } from 'ol/format';
import { Gemarkung } from '../data/gemarkung';
import Feature from 'ol/Feature';
import { Landkreis } from '../data/landkreis';
import { Flur } from '../data/flur';
import { Gemeinde } from '../data/gemeinde';
import { Verbandsgemeinde } from '../data/verbandsgemeinde';
import { Katasteramt } from '../data/katasteramt';
import { Finanzamt } from '../data/finanzamt';
import { Amtsgericht } from '../data/amtsgericht';
import { Court } from '../data/court';
import { Flurstueck } from '../data/flurstueck';

export class SearchArea {
  private _inputCoordinate: Coordinate;
  private _coordinate: Coordinate;
  private _radius: number;
  private _address: Address;
  private _gemarkungen: Gemarkung[];
  private _gemarkungenGeoJSON?: GeoJSON;

  private _flurstuecke: Flurstueck[];
  private _flurstueckeGeoJSON?: GeoJSON;

  constructor(inputCoordinate: Coordinate, radius: number) {
    this._inputCoordinate = inputCoordinate;
    this._gemarkungen = [];
    this._flurstuecke = [];
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

  get gemarkungen(): Gemarkung[] {
    return this._gemarkungen;
  }

  set gemarkungen(value: Gemarkung[]) {
    this._gemarkungen = value;
  }

  getGemarkungenGeoJSON(): GeoJSON | undefined {
    return this._gemarkungenGeoJSON;
  }

  setGemarkungenGeoJSON(value: GeoJSON, courts?: Court[]) {
    this._gemarkungenGeoJSON = value;

    // Parse the properties of the GeoJSON Object
    let features: Feature[] = new GeoJSON().readFeatures(value);
    features.forEach((feature: Feature) => {
      let gemarkung: Gemarkung = new Gemarkung();

      gemarkung.gemarkungsNummer = <number>feature.get('gmkgnr');
      gemarkung.gemarkungsName = <string>feature.get('gemarkung');

      let flur = new Flur();
      flur.flurNummer = <number>feature.get('flur');
      flur.flurName = <string>feature.get('flurname');

      // check if a gemarkung with this id already exists
      let search = this.gemarkungen.find(
        (search: Gemarkung) =>
          search.gemarkungsNummer === gemarkung.gemarkungsNummer
      );
      if (search) {
        search.flure.push(flur);
      } else {
        //if not create the gemarkung :)
        gemarkung.flure.push(flur);

        gemarkung.gemeinde = new Gemeinde();
        gemarkung.gemeinde.gemeindeSchluessel = <number>feature.get('gmdesch');
        gemarkung.gemeinde.gemeindeName = <string>feature.get('gemeinde');
        gemarkung.gemeinde.gemeindeTyp = <string>feature.get('gemtyp');

        gemarkung.verbandsgemeinde = new Verbandsgemeinde();
        gemarkung.verbandsgemeinde.verbandsgemeindeNummer = <number>(
          feature.get('vgnr')
        );
        gemarkung.verbandsgemeinde.verbandsgemeindeName = <string>(
          feature.get('vgname')
        );

        gemarkung.landkreis = new Landkreis();
        gemarkung.landkreis.kreisName = <string>feature.get('ldkreis');
        gemarkung.landkreis.kreisSchluessel = <number>feature.get('kreissch');
        gemarkung.landkreis.kreisTyp = <string>feature.get('kreistyp');

        gemarkung.katasteramt = new Katasteramt();
        gemarkung.katasteramt.katasterNummer = <number>feature.get('kanr');
        gemarkung.katasteramt.katasteramtName = <string>feature.get('katamt');

        gemarkung.finanzamt = new Finanzamt();
        gemarkung.finanzamt.finanzamtName = <string>feature.get('finanzamt');

        gemarkung.amtsgericht = new Amtsgericht();
        gemarkung.amtsgericht.amtsgerichtName = <string>(
          feature.get('amtsgrcht')
        );

        if (courts) {
          let courtData: Court | undefined = courts.find((currCourt: Court) =>
            currCourt.fields.gericht.includes(
              gemarkung.amtsgericht.amtsgerichtName
            )
          );
          if (courtData) {
            gemarkung.amtsgericht.ort = courtData.fields.ort;
            gemarkung.amtsgericht.plz = courtData.fields.plz;
            gemarkung.amtsgericht.e_mail = courtData.fields.e_mail!;
            gemarkung.amtsgericht.strasse = courtData.fields.strasse;
            gemarkung.amtsgericht.bundesland = courtData.fields.bundesland;
            gemarkung.amtsgericht.telefax = courtData.fields.telefax;
            gemarkung.amtsgericht.telefon = courtData.fields.telefon;
            gemarkung.amtsgericht.webseite = courtData.fields.webseite;
            gemarkung.amtsgericht.xjustiz_id = courtData.fields.xjustiz_id;
          }
        }

        this._gemarkungen.push(gemarkung);
      }
    });
  }

  getFlurstueckeGeoJSON(): GeoJSON | undefined {
    return this._flurstueckeGeoJSON;
  }

  setFlurstueckeGeoJSON(value: GeoJSON) {
    this._flurstueckeGeoJSON = value;
  }

  get flurstuecke(): Flurstueck[] {
    return this._flurstuecke;
  }

  set flurstuecke(value: Flurstueck[]) {
    this._flurstuecke = value;
  }
}
