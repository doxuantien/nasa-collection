import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AbstractConverter } from '../abstract.converter';

export const convert = <I, O>(converter: AbstractConverter<I, O>) => pipe(
  filter<I>(it => !!it),
  map<I, O>(it => converter.convert(it))
);
