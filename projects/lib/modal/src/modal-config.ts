export class ModalConfig {
  private _title: string;
  private _data: { [key: string]: object };

  public constructor(innerTitle: string, innerData: { [key: string]: object }) {
    this._title = innerTitle;
    this._data = innerData;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get data(): { [key: string]: object } {
    return this._data;
  }

  public set data(value: { [key: string]: object }) {
    this._data = value;
  }
}
