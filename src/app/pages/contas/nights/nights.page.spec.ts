import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightsPage } from './nights.page';

describe('NightsPage', () => {
  let component: NightsPage;
  let fixture: ComponentFixture<NightsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
