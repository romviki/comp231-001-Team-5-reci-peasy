import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMerchandiseComponent } from './edit-merchandise.component';

describe('EditMercandiseComponent', () => {
  let component: EditMerchandiseComponent;
  let fixture: ComponentFixture<EditMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMerchandiseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
