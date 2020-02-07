/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_userComponent } from './create_user.component';

describe('Create_userComponent', () => {
  let component: Create_userComponent;
  let fixture: ComponentFixture<Create_userComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_userComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_userComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
