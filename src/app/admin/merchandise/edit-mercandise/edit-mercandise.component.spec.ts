import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMercandiseComponent } from './edit-mercandise.component';

describe('EditMercandiseComponent', () => {
  let component: EditMercandiseComponent;
  let fixture: ComponentFixture<EditMercandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMercandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMercandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
