import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-remove-merchandise-modal',
  templateUrl: './remove-merchandise-modal.component.html',
  styleUrls: ['./remove-merchandise-modal.component.scss'],
})
export class RemoveMerchandiseModalComponent implements OnInit {
  merchandiseId!: string;
  merchandiseName!: string;

  constructor(
    public bsModalRef: BsModalRef,
    private merchandiseService: MerchandiseService
  ) {}

  ngOnInit() {}

  removeMerchandise() {
    this.merchandiseService
      .removeMerchandiseById(this.merchandiseId)
      .then((_) => {
        this.bsModalRef.hide();
      });
  }
}
