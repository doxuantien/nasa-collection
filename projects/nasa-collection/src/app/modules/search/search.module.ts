import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { NasaSearchComponent } from './nasa-search.component';
import { SearchResultsConverter } from './search-results.converter';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchRoutingModule } from './search.routing.module';

@NgModule({
  declarations: [NasaSearchComponent, SearchResultsComponent],
  imports: [RouterModule, SearchRoutingModule, SharedModule, CommonModule],
  providers: [SearchResultsConverter]
})
export class SearchModule {}
