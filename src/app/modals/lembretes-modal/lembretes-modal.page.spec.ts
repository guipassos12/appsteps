import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembretesModalPage } from './lembretes-modal.page';

describe('LembretesModalPage', () => {
  let component: LembretesModalPage;
  let fixture: ComponentFixture<LembretesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembretesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembretesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
