export class DialogConfig {
  private innerTitle: string;
  private innerData: { [key: string]: any };

  public constructor(innerTitle: string, innerData: { [p: string]: any }) {
    this.innerTitle = innerTitle;
    this.innerData = innerData;
  }

  public get title(): string {
    return this.innerTitle;
  }

  public set title(value: string) {
    this.innerTitle = value;
  }

  public get data(): { [p: string]: any } {
    return this.innerData;
  }

  public set data(value: { [p: string]: any }) {
    this.innerData = value;
  }
}
