import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetApiService } from '../api/asset.api.service';

@Injectable()
export class AssetService {
  public constructor(private assetApi: AssetApiService) {}

  public getFirstAsset(nasaId: string, mediaType: string): Observable<string> {
    const extension = mediaType === 'video' ? '.mp4' : '.jpg';

    return this.assetApi.getAssetByNasaId(nasaId).pipe(
      map(response => response.collection.items),
      map(
        items =>
          items.find(it => {
            const href = it.href;

            return href.slice(href.lastIndexOf('.'), href.length) === extension;
          }).href
      )
    );
  }
}
