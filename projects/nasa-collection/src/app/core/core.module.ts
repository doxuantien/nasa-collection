import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AssetApiService } from './api/asset.api.service';
import { ApiUrlInterceptor } from './api/interceptors/api-url.interceptor';
import { SearchApiService } from './api/search.api.service';
import { AssetService } from './services/asset.service';
import { CollectionService } from './services/collection.service';
import { SearchService } from './services/search.service';
import { VideoPlayerService } from './services/video-player.service';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  providers: [
    SearchApiService,
    SearchService,
    AssetApiService,
    AssetService,
    VideoPlayerService,
    CollectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.');
    }
  }
}
