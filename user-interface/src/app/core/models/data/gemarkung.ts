import { Flur } from './flur';
import { Landkreis } from './landkreis';
import { Verbandsgemeinde } from './verbandsgemeinde';
import { Gemeinde } from './gemeinde';
import { Finanzamt } from './finanzamt';
import { Katasteramt } from './katasteramt';
import { Amtsgericht } from './amtsgericht';

export class Gemarkung {
  // Gemarkungs Informationen
  private _gemarkungsNummer?: number;
  private _gemarkungsName?: string;
  private _flure: Flur[];

  // Verltungsstruktur
  private _landkreis?: Landkreis;
  private _verbandsgemeinde?: Verbandsgemeinde;
  private _gemeinde?: Gemeinde;

  // Ämter
  private _finanzamt?: Finanzamt;
  private _katasteramt?: Katasteramt;
  private _amtsgericht?: Amtsgericht;

  constructor() {
    this._flure = [];
  }

  get gemarkungsNummer(): number {
    return <number>this._gemarkungsNummer;
  }

  set gemarkungsNummer(value: number) {
    this._gemarkungsNummer = value;
  }

  get gemarkungsName(): string {
    return <string>this._gemarkungsName;
  }

  set gemarkungsName(value: string) {
    this._gemarkungsName = value;
  }

  get flure(): Flur[] {
    return <Flur[]>this._flure;
  }

  set flure(value: Flur[]) {
    this._flure = value;
  }

  get landkreis(): Landkreis {
    return <Landkreis>this._landkreis;
  }

  set landkreis(value: Landkreis) {
    this._landkreis = value;
  }

  get verbandsgemeinde(): Verbandsgemeinde {
    return <Verbandsgemeinde>this._verbandsgemeinde;
  }

  set verbandsgemeinde(value: Verbandsgemeinde) {
    this._verbandsgemeinde = value;
  }

  get gemeinde(): Gemeinde {
    return <Gemeinde>this._gemeinde;
  }

  set gemeinde(value: Gemeinde) {
    this._gemeinde = value;
  }

  get finanzamt(): Finanzamt {
    return <Finanzamt>this._finanzamt;
  }

  set finanzamt(value: Finanzamt) {
    this._finanzamt = value;
  }

  get katasteramt(): Katasteramt {
    return <Katasteramt>this._katasteramt;
  }

  set katasteramt(value: Katasteramt) {
    this._katasteramt = value;
  }

  get amtsgericht(): Amtsgericht {
    return <Amtsgericht>this._amtsgericht;
  }

  set amtsgericht(value: Amtsgericht) {
    this._amtsgericht = value;
  }
}
