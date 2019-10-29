import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasinsegurasPage } from './zonasinseguras.page';

describe('ZonasinsegurasPage', () => {
  let component: ZonasinsegurasPage;
  let fixture: ComponentFixture<ZonasinsegurasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasinsegurasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasinsegurasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
