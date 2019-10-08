import { Injectable } from '@angular/core';
import { ItemModel } from '@shared/models/item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CollectionService {
  private readonly localStorageKey = 'NASA_COLLECTION';
  private readonly innerValue$ = new BehaviorSubject<ItemModel[]>(
    JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  );

  get collection(): Observable<ItemModel[]> {
    return this.innerValue$.asObservable();
  }

  public addItem(item: ItemModel): void {
    const currentValue = [...this.innerValue$.getValue()];

    this.updateCollection([...currentValue, item]);
  }

  public updateItem(item: ItemModel): void {
    const currentItems = this.innerValue$.getValue();
    const index = currentItems.findIndex(it => it.nasaId === item.nasaId);
    const frontPart = currentItems.slice(0, index);
    const behindPart = currentItems.slice(index + 1);

    this.updateCollection([...frontPart, item, ...behindPart]);
  }

  public removeItem(item: ItemModel): void {
    const currentItems = this.innerValue$.getValue();
    const filtered = currentItems.filter(it => it.nasaId !== item.nasaId);

    this.updateCollection(filtered);
  }

  private updateCollection(collection: ItemModel[]): void {
    this.innerValue$.next(collection);
    localStorage.setItem(this.localStorageKey, JSON.stringify(collection));
  }
}
