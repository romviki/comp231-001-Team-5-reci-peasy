import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchandiseListComponent } from './merchandise-list/merchandise-list.component';
import { AddMerchandiseComponent } from './add-merchandise/add-merchandise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMercandiseComponent } from './edit-mercandise/edit-mercandise.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [MerchandiseListComponent, AddMerchandiseComponent, EditMercandiseComponent],
  exports: [MerchandiseListComponent, AddMerchandiseComponent, EditMercandiseComponent]
})

export class MerchandiseModule { }