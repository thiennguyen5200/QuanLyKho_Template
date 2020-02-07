/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { List_userComponent } from './list_user.component';

describe('List_userComponent', () => {
  let component: List_userComponent;
  let fixture: ComponentFixture<List_userComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List_userComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List_userComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
