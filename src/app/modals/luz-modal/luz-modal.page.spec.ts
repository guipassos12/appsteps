import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuzModalPage } from './luz-modal.page';

describe('LuzModalPage', () => {
  let component: LuzModalPage;
  let fixture: ComponentFixture<LuzModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuzModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuzModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
