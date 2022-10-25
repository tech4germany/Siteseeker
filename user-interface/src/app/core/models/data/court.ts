export class Court {
  datasetid: string;
  recordid: string;
  fields: Fields;
  geometry: Geometry;
  record_timestamp: string;

  constructor(
    datasetid: string,
    recordid: string,
    fields: Fields,
    geometry: Geometry,
    record_timestamp: string
  ) {
    this.datasetid = datasetid;
    this.recordid = recordid;
    this.fields = fields;
    this.geometry = geometry;
    this.record_timestamp = record_timestamp;
  }
}

export class Fields {
  arcgisausgabe: number[];
  strasse: string;
  gericht: string;
  telefon: string;
  ort: string;
  geom?: Geom;
  e_mail?: string;
  xjustiz_id: string;
  plz: string;
  bundesland: string;
  telefax: string;
  webseite: string;
  centroid?: number[];

  constructor(
    arcgisausgabe: number[],
    strasse: string,
    gericht: string,
    telefon: string,
    ort: string,
    geom: Geom,
    e_mail: string,
    xjustiz_id: string,
    plz: string,
    bundesland: string,
    telefax: string,
    webseite: string,
    centroid: number[]
  ) {
    this.arcgisausgabe = arcgisausgabe;
    this.strasse = strasse;
    this.gericht = gericht;
    this.telefon = telefon;
    this.ort = ort;
    this.geom = geom;
    this.e_mail = e_mail;
    this.xjustiz_id = xjustiz_id;
    this.plz = plz;
    this.bundesland = bundesland;
    this.telefax = telefax;
    this.webseite = webseite;
    this.centroid = centroid;
  }
}

export class Geom {
  coordinates: number[][][];
  type: string;

  constructor(coordinates: number[][][], type: string) {
    this.coordinates = coordinates;
    this.type = type;
  }
}

export class Geometry {
  constructor(type: string, coordinates: number[]) {
    this.type = type;
    this.coordinates = coordinates;
  }

  type: string;
  coordinates: number[];
}
