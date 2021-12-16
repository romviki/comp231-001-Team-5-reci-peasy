import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchandiseListComponent } from './merchandise-list/merchandise-list.component';
import { AddMerchandiseComponent } from './add-merchandise/add-merchandise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMerchandiseComponent } from './edit-merchandise/edit-merchandise.component';
import { RouterModule } from '@angular/router';
import { ArrayFormatPipe } from 'src/app/pipes/array-format.pipe';
import { RemoveMerchandiseModalComponent } from './remove-merchandise-modal/remove-merchandise-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    MerchandiseListComponent,
    AddMerchandiseComponent,
    EditMerchandiseComponent,
    RemoveMerchandiseModalComponent,

    // pipes
    ArrayFormatPipe,
  ],
  exports: [
    MerchandiseListComponent,
    AddMerchandiseComponent,
    EditMerchandiseComponent,
    RemoveMerchandiseModalComponent,
  ],
})
export class AdminMerchandiseModule {}
