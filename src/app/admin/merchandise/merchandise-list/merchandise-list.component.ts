import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Merchandise } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import { RemoveMerchandiseModalComponent } from '../remove-merchandise-modal/remove-merchandise-modal.component';

@Component({
  selector: 'app-merchandise-list',
  templateUrl: './merchandise-list.component.html',
  styleUrls: ['./merchandise-list.component.scss'],
})
export class MerchandiseListComponent implements OnInit {
  merchandiseList$?: Observable<Merchandise[]>;

  constructor(
    private merchandiseService: MerchandiseService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.merchandiseList$ = this.merchandiseService.getAllMerchandise();
  }

  navigateToEditMerchandise(merchandise: Merchandise): void {
    this.merchandiseService.editingMerchandise$.next(merchandise);
    this.router.navigate(['merchandise-list/edit', merchandise.id]);
  }

  confirmMerchandiseDelete(merchandise: Merchandise): void {
    const modalOptions: ModalOptions = {
      initialState: {
        merchandiseId: merchandise.id,
        merchandiseName: merchandise.name,
      },
    };
    this.modalService.show(RemoveMerchandiseModalComponent, modalOptions);
  }
}
