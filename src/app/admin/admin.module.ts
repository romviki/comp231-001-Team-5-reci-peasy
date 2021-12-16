import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMerchandiseModule } from './merchandise/admin-merchandise.module';

@NgModule({
  imports: [CommonModule, AdminMerchandiseModule],
  declarations: [],
  exports: [],
})
export class AdminModule {}
