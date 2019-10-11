import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AssetService } from '@core/services/asset.service';
import { CollectionService } from '@core/services/collection.service';
import { VideoPlayerService } from '@core/services/video-player.service';
import { ModalConfig, ModalService } from '@jo/modal';
import { ItemFormComponent } from '@shared/components/item-form/item-form.component';
import { ItemActionEnum } from '@shared/models/enums/item-action.enum';
import { ItemModel } from '@shared/models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  @Input() public query: string;
  @Input() public quantity: number;
  @Input() public items: ItemModel[];

  public constructor(
    private assetService: AssetService,
    private dialogService: ModalService,
    private collectionService: CollectionService,
    private videoPlayerService: VideoPlayerService
  ) {}

  public onActionEmitted({ action, _ }, item: ItemModel): void {
    switch (action) {
      case ItemActionEnum.ADD:
        this.openDialog(item);
        break;
      case ItemActionEnum.OPEN_VIDEO:
        this.openVideo(item);
        break;
      default:
        break;
    }
  }

  private openDialog(item: ItemModel): void {
    this.getAssetLink(item).subscribe(href => {
      item.asset = href;
      const data = { item, action: 'add' };
      const config = new ModalConfig('Add to collection', data);

      this.dialogService.open(ItemFormComponent, config);
    });
  }

  private openVideo(item: ItemModel): void {
    this.getAssetLink(item).subscribe(href => this.videoPlayerService.openVideo({ title: item.title, source: href }));
  }

  private getAssetLink(item: ItemModel): Observable<string> {
    return this.assetService.getFirstAsset(item.nasaId, item.mediaType);
  }
}
