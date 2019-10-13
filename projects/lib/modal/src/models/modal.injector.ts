import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class ModalInjector implements Injector {
  public constructor(private parentInjector: Injector, private additionalTokens: WeakMap<any, any>) {}

  public get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T {
    return this.additionalTokens.get(token) || this.parentInjector.get<T>(token, notFoundValue, flags);
  }
}
