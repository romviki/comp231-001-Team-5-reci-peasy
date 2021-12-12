import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchandiseListComponent } from './merchandise-list/merchandise-list.component';
import { AddMerchandiseComponent } from './add-merchandise/add-merchandise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMerchandiseComponent } from './edit-merchandise/edit-merchandise.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    MerchandiseListComponent,
    AddMerchandiseComponent,
    EditMerchandiseComponent,
  ],
  exports: [
    MerchandiseListComponent,
    AddMerchandiseComponent,
    EditMerchandiseComponent,
  ],
})
export class MerchandiseModule {}
