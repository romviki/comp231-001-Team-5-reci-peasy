import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavComponent,
    TopNavComponent,
    SearchBarComponent,
    LoadingComponent,
  ],
  exports: [
    NavComponent,
    TopNavComponent,
    SearchBarComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
