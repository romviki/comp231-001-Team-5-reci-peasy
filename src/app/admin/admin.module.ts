import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MerchandiseModule } from './merchandise/merchandise.module';

@NgModule({
  imports: [
    CommonModule,
    MerchandiseModule
  ],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
