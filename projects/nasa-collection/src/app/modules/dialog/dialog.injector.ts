import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class DialogInjector implements Injector {
  public constructor(private parentInjector: Injector, private additionalTokens: WeakMap<any, any>) {}

  public get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;

  public get(token: any, notFoundValue?: any);

  public get(token, notFoundValue?, flags?: InjectFlags): any {
    const value = this.additionalTokens.get(token);

    if (value) {
      return value;
    }

    return this.parentInjector.get<any>(token, notFoundValue);
  }
}
