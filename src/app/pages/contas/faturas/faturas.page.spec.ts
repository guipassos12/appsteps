import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturasPage } from './faturas.page';

describe('FaturasPage', () => {
  let component: FaturasPage;
  let fixture: ComponentFixture<FaturasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
