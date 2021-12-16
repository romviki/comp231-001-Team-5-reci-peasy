import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DecimalValidator } from 'src/app/form-validators/decimal.validator';
import { Allergen, Merchandise, Unit } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-add-merchandise',
  templateUrl: './add-merchandise.component.html',
  styleUrls: ['./add-merchandise.component.scss'],
})
export class AddMerchandiseComponent implements OnInit {
  merchandise$?: Observable<Merchandise | undefined>;
  addMerchandiseForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, DecimalValidator(2)]],
    unit: ['g', [Validators.required]],
    volume: [
      '',
      [Validators.required, Validators.max(9999.99), DecimalValidator(2)],
    ],
    stock: ['', [Validators.max(9999), DecimalValidator(0)]],
    allergens: this.fb.array([]),
  });
  units: Unit[] = ['g', 'kg', 'ml', 'L', 'counts'];
  allergenTypes: Allergen[] = ['dairy', 'eggs', 'gluten', 'nuts', 'seafood'];
  merchandiseId!: string;

  constructor(
    private merchandiseService: MerchandiseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  get name() {
    return this.addMerchandiseForm.get('name');
  }

  get price() {
    return this.addMerchandiseForm.get('price');
  }

  get unit() {
    return this.addMerchandiseForm.get('unit');
  }

  get volume() {
    return this.addMerchandiseForm.get('volume');
  }

  get stock() {
    return this.addMerchandiseForm.get('stock');
  }

  get allergens() {
    return this.addMerchandiseForm.get('allergens') as FormArray;
  }

  addAllergenInput(allergen = '') {
    this.allergens.push(this.fb.control(allergen));
  }

  removeAllergen(i: number) {
    this.allergens.removeAt(i);
    this.addMerchandiseForm.markAsDirty();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addMerchandiseForm.valid && this.addMerchandiseForm.dirty) {
      this.merchandiseService.createMerchandise(this.addMerchandiseForm.value);
    }
    this.router.navigate(['merchandise-list']);
  }
}
