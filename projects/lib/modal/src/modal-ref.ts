import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly _close$ = new Subject();

  get close$(): Observable<unknown> {
    return this._close$.asObservable();
  }

  public close(): void {
    this._close$.next();
  }
}
