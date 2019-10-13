export class ModalConfig {
  private _title: string;
  private _data: { [key: string]: unknown };

  public constructor(innerTitle: string, innerData: { [key: string]: unknown }) {
    this._title = innerTitle;
    this._data = innerData;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get data(): { [key: string]: unknown } {
    return this._data;
  }

  public set data(value: { [key: string]: unknown }) {
    this._data = value;
  }
}
