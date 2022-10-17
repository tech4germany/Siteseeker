export class Finanzamt {
  private _finanzamtName?: string;

  get finanzamtName(): string {
    return <string>this._finanzamtName;
  }

  set finanzamtName(value: string) {
    this._finanzamtName = value;
  }
}
