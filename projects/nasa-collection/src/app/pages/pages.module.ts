import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@modules/dialog/dialog.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule, CommonModule, SharedModule, DialogModule],
})
export class PagesModule {}
