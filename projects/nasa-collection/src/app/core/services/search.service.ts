import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchApiService } from '../api/search.api.service';
import { SearchItemModel } from '../models/search-item.model';
import { SearchResponseModel } from '../models/search-response.model';

@Injectable()
export class SearchService {
  public constructor(private searchApi: SearchApiService) {}

  public searchByQuery(query: string): Observable<SearchResponseModel<SearchItemModel>> {
    const params = new HttpParams({ fromObject: { q: query, media_type: 'video' } });

    return this.searchApi.search(params).pipe(
      map(response => ({
        total: response.collection.metadata.total_hits,
        items: response.collection.items.slice(0, 20)
      }))
    );
  }
}
