import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeFormPopupComponent } from './cake-form-popup.component';

describe('CakeFormPopupComponent', () => {
  let component: CakeFormPopupComponent;
  let fixture: ComponentFixture<CakeFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
