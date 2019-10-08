import { Observable, Subject } from 'rxjs';

export class DialogRef {
  private readonly innerClose$ = new Subject();

  get close$(): Observable<unknown> {
    return this.innerClose$.asObservable();
  }

  public constructor() {}

  public close(): void {
    this.innerClose$.next();
  }
}
