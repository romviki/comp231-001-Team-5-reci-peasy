import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Merchandise } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-edit-merchandise',
  templateUrl: './edit-merchandise.component.html',
  styleUrls: ['./edit-merchandise.component.scss'],
})
export class EditMerchandiseComponent implements OnInit {
  editMerchandiseForm: FormGroup;
  soldByOptions: string[] = [
    'Piece',
    'Liters',
    'MilliLitter',
    'Grams',
    'Kilograms',
  ];
  merchandiseId: string = '';

  constructor(
    private merchandiseService: MerchandiseService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      id: string;
    };

    this.editMerchandiseForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      soldBy: new FormControl(),
      volume: new FormControl(),
      allergenInformation: new FormControl(),
    });

    this.merchandiseId = state.id;

    console.log('edit merchandise id: ', this.merchandiseId);
    this.merchandiseService
      .getMerchandise(this.merchandiseId)
      .subscribe((res) => {
        const selectedMerchandise = res as Merchandise;
        console.log('merchandise for edit ->', selectedMerchandise);
        // set form values
        this.editMerchandiseForm.controls['name'].setValue(
          selectedMerchandise?.name
        );
        this.editMerchandiseForm.controls['price'].setValue(
          selectedMerchandise?.price
        );
        this.editMerchandiseForm.controls['soldBy'].setValue(
          selectedMerchandise?.soldBy
        );
        this.editMerchandiseForm.controls['volume'].setValue(
          selectedMerchandise?.volume
        );
        this.editMerchandiseForm.controls['allergenInformation'].setValue(
          selectedMerchandise?.allergenInformation
        );
      });
  }

  ngOnInit(): void {}

  updateMerchandise() {
    // bind to Merchandise Model
    var updatedMerchandise = {
      allergenInformation: this.editMerchandiseForm.value.allergenInformation,
      name: this.editMerchandiseForm.value.name,
      price: this.editMerchandiseForm.value.price,
      soldBy: this.editMerchandiseForm.value.soldBy,
      volume: this.editMerchandiseForm.value.volume,
    } as Merchandise;

    // console.log('editMerchandiseForm -> ', updatedMerchandise);

    this.merchandiseService
      .updateMerchandise(this.merchandiseId, updatedMerchandise)
      .subscribe((res) => {
        console.log('update result -> ', res);
      });
  }
}
