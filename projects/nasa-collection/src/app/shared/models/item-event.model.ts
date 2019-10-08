import { ItemActionEnum } from './enums/item-action.enum';
import { ItemModel } from './item.model';

export interface ItemEventModel {
  action: ItemActionEnum;
  item: ItemModel;
}
