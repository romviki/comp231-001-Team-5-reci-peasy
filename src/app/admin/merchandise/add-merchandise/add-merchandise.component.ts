import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Merchandise } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-add-merchandise',
  templateUrl: './add-merchandise.component.html',
  styleUrls: ['./add-merchandise.component.scss'],
})
export class AddMerchandiseComponent implements OnInit {
  addMerchandiseForm: FormGroup;
  soldByOptions: string[] = [
    'Piece',
    'Liters',
    'MilliLitter',
    'Grams',
    'Kilograms',
  ];

  constructor(
    private merchandiseService: MerchandiseService,
    private router: Router
  ) {
    this.addMerchandiseForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      soldBy: new FormControl(),
      volume: new FormControl(),
      allergenInformation: new FormControl(),
    });
  }

  ngOnInit() {}

  public addMerchandise(): void {
    // bind to Merchandise Model
    var newMerchandise = {
      allergenInformation: this.addMerchandiseForm.value.allergenInformation,
      name: this.addMerchandiseForm.value.name,
      price: this.addMerchandiseForm.value.price,
      soldBy: this.addMerchandiseForm.value.soldBy,
      volume: this.addMerchandiseForm.value.volume,
    } as Merchandise;

    console.log('addMerchandiseForm -> ', newMerchandise);

    //   this.loadingService.showLoaderUntilCompleted(
    //     this.merchandiseService.createMerchandise(newMerchandise)
    //   ).subscribe(
    //     (result) => {
    //       console.log("add result", result);
    //     }
    //   );
    // }

    this.merchandiseService
      .createMerchandise(newMerchandise)
      .subscribe((result) => {
        console.log('add result', result);
        // if (result != undefined) {
        //   this.merchandiseService.initMerchandiseCollection();
        // }
        this.router.navigateByUrl('/merchandise-list');
      });
  }
}
