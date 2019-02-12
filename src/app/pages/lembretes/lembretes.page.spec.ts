import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembretesPage } from './lembretes.page';

describe('LembretesPage', () => {
  let component: LembretesPage;
  let fixture: ComponentFixture<LembretesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembretesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembretesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
