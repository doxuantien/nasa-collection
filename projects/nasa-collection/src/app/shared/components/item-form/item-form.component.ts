import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '@core/services/collection.service';
import { ModalRef } from '@jo/modal';
import { ItemModel } from '../../models/item.model';

type Action = 'edit' | 'add';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormComponent {
  public readonly mediaTypes = ['video', 'image'];
  public readonly controls: Control[] = [
    { id: 'title' },
    { id: 'description', type: 'textarea' },
    { id: 'type', type: 'dropdown' },
    { id: 'thumbnail', label: 'Link preview image url', required: true },
    { id: 'asset', label: 'Link file url', required: true }
  ];
  private innerValue: ItemModel;

  @Input() public action: Action;
  @Input() set item(value: ItemModel) {
    this.innerValue = value;
    this.formGroup = this.formBuilder.group({
      title: value.title,
      description: value.description,
      type: new FormControl(null),
      thumbnail: [value.thumbnail, Validators.required],
      asset: [value.asset, Validators.required]
    });
    this.formGroup.get('type').setValue(value.mediaType, { onlySelf: true });
  }

  public formGroup: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private dialogRef: ModalRef
  ) {}

  public onClickAction(): void {
    if (this.formGroup.valid) {
      switch (this.action) {
        case 'edit':
          this.updateItem();
          break;
        case 'add':
          this.addItem();
          break;
        default:
          break;
      }

      this.dialogRef.close();
    }
  }

  private addItem(): void {
    this.collectionService.addItem(this.extractItem());
  }

  private updateItem(): void {
    this.collectionService.updateItem(this.extractItem());
  }

  private extractItem(): ItemModel {
    return {
      ...this.innerValue,
      title: this.formGroup.get('title').value,
      description: this.formGroup.get('description').value,
      mediaType: this.formGroup.get('type').value,
      thumbnail: this.formGroup.get('thumbnail').value,
      asset: this.formGroup.get('asset').value
    };
  }
}

interface Control {
  id: string;
  type?: string;
  label?: string;
  required?: boolean;
}
