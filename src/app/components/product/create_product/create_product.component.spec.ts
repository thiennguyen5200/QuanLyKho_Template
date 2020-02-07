/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_productComponent } from './create_product.component';

describe('Create_productComponent', () => {
  let component: Create_productComponent;
  let fixture: ComponentFixture<Create_productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
