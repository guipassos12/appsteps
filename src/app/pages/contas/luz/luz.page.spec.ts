import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuzPage } from './luz.page';

describe('LuzPage', () => {
  let component: LuzPage;
  let fixture: ComponentFixture<LuzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuzPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
