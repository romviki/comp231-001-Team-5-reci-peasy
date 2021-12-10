/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MerchandiseListComponent } from './merchandise-list.component';

describe('MerchandiseListComponent', () => {
  let component: MerchandiseListComponent;
  let fixture: ComponentFixture<MerchandiseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
