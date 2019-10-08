import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetItemModel } from '../models/asset-item.model';
import { ResponseModel } from '../models/response.model';
import { END_POINT } from './constants';

@Injectable()
export class AssetApiService {
  private readonly path = END_POINT.ASSET;

  public constructor(private http: HttpClient) {}

  public getAssetByNasaId(nasaId: string): Observable<ResponseModel<AssetItemModel>> {
    return this.http.get<ResponseModel<AssetItemModel>>(`${this.path}/${nasaId}`);
  }
}
