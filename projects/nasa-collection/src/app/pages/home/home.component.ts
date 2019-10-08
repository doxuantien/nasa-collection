import { Component, HostBinding, OnInit } from '@angular/core';
import { CollectionService } from '@core/services/collection.service';
import { VideoPlayerService } from '@core/services/video-player.service';
import { DialogConfig } from '@modules/dialog/dialog-config';
import { DialogService } from '@modules/dialog/dialog.service';
import { ItemFormComponent } from '@shared/components/item-form/item-form.component';
import { ItemActionEnum } from '@shared/models/enums/item-action.enum';
import { ItemModel } from '@shared/models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public items$: Observable<ItemModel[]>;

  @HostBinding('class')
  private containerClass = 'container';

  public constructor(
    private dialogService: DialogService,
    private collectionService: CollectionService,
    private videoPlayerService: VideoPlayerService
  ) {}

  public ngOnInit(): void {
    this.items$ = this.collectionService.collection;
  }

  public onActionEmitted(event: { action: ItemActionEnum; item: ItemModel }): void {
    switch (event.action) {
      case ItemActionEnum.TOGGLE_FAVORITE:
        this.changeFavorite(event.item);
        break;
      case ItemActionEnum.OPEN_VIDEO:
        this.videoPlayerService.openVideo({ title: event.item.title, source: event.item.asset });
        break;
      case ItemActionEnum.DELETE:
        this.collectionService.removeItem(event.item);
        break;
      case ItemActionEnum.EDIT:
        this.openDialog(event.item);
        break;
      default:
        break;
    }
  }

  public trackByNasaId(_: number, item: ItemModel): string {
    return item.nasaId;
  }

  private changeFavorite(item: ItemModel): void {
    item.isFavorite = !item.isFavorite;

    this.collectionService.updateItem(item);
  }

  private openDialog(item: ItemModel): void {
    const data = { item, action: 'edit' };
    const config = new DialogConfig('Edit', data);

    this.dialogService.open(ItemFormComponent, config);
  }
}
