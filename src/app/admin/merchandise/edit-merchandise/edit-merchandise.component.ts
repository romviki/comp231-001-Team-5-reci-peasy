import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DecimalValidator } from 'src/app/form-validators/decimal.validator';
import { Allergen, Merchandise, Unit } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-edit-merchandise',
  templateUrl: './edit-merchandise.component.html',
  styleUrls: ['./edit-merchandise.component.scss'],
})
export class EditMerchandiseComponent implements OnInit {
  merchandise$?: Observable<Merchandise | undefined>;
  editMerchandiseForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, DecimalValidator(2)]],
    unit: ['', [Validators.required]],
    volume: ['', [Validators.required, Validators.max(9999.99)]],
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
    return this.editMerchandiseForm.get('name');
  }

  get price() {
    return this.editMerchandiseForm.get('price');
  }

  get unit() {
    return this.editMerchandiseForm.get('unit');
  }

  get volume() {
    return this.editMerchandiseForm.get('volume');
  }

  get stock() {
    return this.editMerchandiseForm.get('stock');
  }

  get allergens() {
    return this.editMerchandiseForm.get('allergens') as FormArray;
  }

  addAllergenInput(allergen = '') {
    this.allergens.push(this.fb.control(allergen));
  }

  removeAllergen(i: number) {
    this.allergens.removeAt(i);
    this.editMerchandiseForm.markAsDirty();
  }

  ngOnInit(): void {
    this.merchandise$ = this.merchandiseService.editingMerchandise$.pipe(
      tap((merchandise) => {
        merchandise?.allergens?.forEach((allergen) =>
          this.addAllergenInput(allergen)
        );
        this.editMerchandiseForm.patchValue(merchandise!);

        this.merchandiseId = this.route.snapshot.params.id;
      })
    );
  }

  onSubmit() {
    if (this.editMerchandiseForm.valid && this.editMerchandiseForm.dirty) {
      this.merchandiseService.updateMerchandise(
        this.merchandiseId,
        this.editMerchandiseForm.value
      );
    }
    this.router.navigate(['merchandise-list']);
  }
}
