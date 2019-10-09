import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchItemModel } from '@core/models/search-item.model';
import { SearchResponseModel } from '@core/models/search-response.model';
import { SearchService } from '@core/services/search.service';
import { SearchComponent } from '@shared/components/search.component';
import { ItemModel } from '@shared/models/item.model';
import { convert } from '@shared/utils/rx.util';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { SearchResultsConverter } from './search-results.converter';

@Component({
  selector: 'app-search-page',
  templateUrl: './nasa-search.component.pug',
  styleUrls: ['./nasa-search.component.sass']
})
export class NasaSearchComponent implements OnInit {
  public readonly items$ = new Subject<ItemModel[]>();
  public readonly quantity$ = new Subject<number>();
  public readonly query$ = new Subject<string>();

  @ViewChild(SearchComponent, { static: true })
  private searchComponent: SearchComponent;

  public constructor(private searchService: SearchService, private converter: SearchResultsConverter) {}

  public ngOnInit(): void {
    this.searchComponent.queryChanges
      .pipe(
        filter<string>(Boolean),
        filter(query => query.length >= 3),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap(query => this.executeSearchAction(query)),
        tap(results => this.quantity$.next(results.total)),
        map(results => results.items),
        convert(this.converter)
      )
      .subscribe(items => this.items$.next(items));
  }

  private executeSearchAction(query: string): Observable<SearchResponseModel<SearchItemModel>> {
    this.query$.next(query);

    return this.searchService.searchByQuery(query);
  }
}
