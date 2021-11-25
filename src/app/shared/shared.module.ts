import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AdminDropdownComponent } from './admin-dropdown/admin-dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TopNavWrapperComponent } from './top-nav-wrapper/top-nav-wrapper.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    NavComponent,
    TopNavComponent,
    SearchBarComponent,
    LoadingComponent,

    // used inside shared module - no export
    AdminDropdownComponent,
    TopNavWrapperComponent,
    MobileNavComponent,
  ],
  exports: [
    NavComponent,
    TopNavComponent,
    SearchBarComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
