import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AdminDropdownComponent } from './admin-dropdown/admin-dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TopNavWrapperComponent } from './top-nav-wrapper/top-nav-wrapper.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    NavComponent,
    TopNavComponent,
    SearchBarComponent,

    // used inside shared module - no export
    AdminDropdownComponent,
    TopNavWrapperComponent,
    MobileNavComponent,
  ],
  exports: [NavComponent, TopNavComponent, SearchBarComponent],
})
export class SharedModule {}
