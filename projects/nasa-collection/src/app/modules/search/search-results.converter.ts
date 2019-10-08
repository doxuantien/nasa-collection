import { ItemDataModel } from '@core/models/item-data.model';
import { LinkModel } from '@core/models/link.model';
import { SearchItemModel } from '@core/models/search-item.model';
import { AbstractConverter } from '@shared/abstract.converter';
import { ItemModel } from '@shared/models/item.model';

export class SearchResultsConverter extends AbstractConverter<SearchItemModel[], ItemModel[]> {
  protected execute(searchItems: SearchItemModel[]): ItemModel[] {
    return searchItems.map(it => ({
      ...this.extractFromData(it.data),
      thumbnail: this.extractThumbnail(it.links)
    }));
  }

  private extractFromData(data: ItemDataModel[]): PartialData {
    if (!data[0]) {
      return { mediaType: '', title: '', description: '', date: '', location: '', nasaId: '' };
    } else {
      const item = data[0];

      return {
        nasaId: item.nasa_id,
        mediaType: item.media_type,
        date: item.date_created,
        title: item.title,
        location: item.location,
        description: item.description
      };
    }
  }

  private extractThumbnail(links: LinkModel[]): string {
    if (links.length === 0) {
      return '';
    } else {
      const target = links.filter(it => it.rel === 'preview' && it.render === 'image');

      return target && target.length !== 0 ? target[0].href : '';
    }
  }
}

interface PartialData {
  nasaId: string;
  mediaType: string;
  title: string;
  description: string;
  date: string;
  location: string;
}
