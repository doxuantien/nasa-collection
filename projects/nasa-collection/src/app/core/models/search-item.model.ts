import { ItemDataModel } from './item-data.model';
import { LinkModel } from './link.model';

export interface SearchItemModel {
  href: string;
  links: LinkModel[];
  data: ItemDataModel[];
}
