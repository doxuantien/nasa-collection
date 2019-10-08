import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <input
      type="text"
      placeholder="Type something to search..."
      [ngModel]="query"
      (ngModelChange)="onQueryChanges($event)"
    />
  `,
  styles: [
    `
      input {
        width: 100%;
        font-size: 25px;
        border: 1px solid #5a5a5a;
        border-radius: 7px;
        padding: 15px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnDestroy {
  public query: string;
  private readonly queryChanges$ = new BehaviorSubject<string>(null);

  get queryChanges(): Observable<string> {
    return this.queryChanges$.asObservable();
  }

  public ngOnDestroy(): void {
    this.queryChanges$.complete();
  }

  public onQueryChanges(newValue: string): void {
    this.queryChanges$.next(newValue);
  }
}
