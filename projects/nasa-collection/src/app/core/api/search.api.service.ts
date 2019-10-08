import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { SearchItemModel } from '../models/search-item.model';
import { END_POINT } from './constants';

@Injectable()
export class SearchApiService {
  private readonly path = END_POINT.SEARCH;

  public constructor(private http: HttpClient) {}

  public search(params: HttpParams): Observable<ResponseModel<SearchItemModel>> {
    return this.http.get<ResponseModel<SearchItemModel>>(this.path, { params });
  }
}
