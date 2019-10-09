import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemActionEnum } from '../../models/enums/item-action.enum';
import { ItemTypeEnum } from '../../models/enums/item-type.enum';
import { ItemEventModel } from '../../models/item-event.model';
import { ItemModel } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  public isFavorite: boolean;
  public item: ItemModel;

  @Input() public itemType: ItemTypeEnum = ItemTypeEnum.NORMAL;
  @Input() set model(value: ItemModel) {
    this.isFavorite = value.isFavorite;
    this.item = { ...value };
  }

  @Output() public action = new EventEmitter<ItemEventModel>();

  public onClickFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.action.emit({ action: ItemActionEnum.TOGGLE_FAVORITE, item: this.item });
  }

  public onAddItemToCollection(): void {
    // TODO: Need to handle
    this.action.emit({ action: ItemActionEnum.ADD, item: null });
  }

  public onOpenVideo(): void {
    if (this.item.mediaType === 'video') {
      this.action.emit({ action: ItemActionEnum.OPEN_VIDEO, item: this.item });
    }
  }

  public onClickDelete(): void {
    this.action.emit({ action: ItemActionEnum.DELETE, item: this.item });
  }

  public onClickEdit(): void {
    this.action.emit({ action: ItemActionEnum.EDIT, item: this.item });
  }
}
