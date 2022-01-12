import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertNationalComponent } from './transfert-national.component';

describe('TransfertNationalComponent', () => {
  let component: TransfertNationalComponent;
  let fixture: ComponentFixture<TransfertNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
