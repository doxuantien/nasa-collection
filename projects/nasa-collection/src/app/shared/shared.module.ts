import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemComponent } from './components/item/item.component';
import { SearchComponent } from './components/search.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ItemComponent, SearchComponent, FormatDatePipe, VideoPlayerComponent, ItemFormComponent],
  exports: [ItemComponent, SearchComponent, FormatDatePipe, VideoPlayerComponent, ItemFormComponent],
  entryComponents: [ItemFormComponent]
})
export class SharedModule {}
