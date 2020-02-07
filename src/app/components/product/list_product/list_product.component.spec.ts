/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { List_productComponent } from './list_product.component';

describe('List_productComponent', () => {
  let component: List_productComponent;
  let fixture: ComponentFixture<List_productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List_productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List_productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
