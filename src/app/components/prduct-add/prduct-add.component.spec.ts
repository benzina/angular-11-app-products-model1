import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductAddComponent } from './prduct-add.component';

describe('PrductAddComponent', () => {
  let component: PrductAddComponent;
  let fixture: ComponentFixture<PrductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrductAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
