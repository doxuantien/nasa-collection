export abstract class AbstractConverter<I, O> {
  public convert(input: I): O {
    return this.execute(input);
  }

  protected abstract execute(input: I): O;
}
