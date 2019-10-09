import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from '@jo/modal';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule, CommonModule, SharedModule, ModalModule]
})
export class PagesModule {}
