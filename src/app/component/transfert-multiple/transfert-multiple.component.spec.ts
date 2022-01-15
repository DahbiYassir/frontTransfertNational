import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertMultipleComponent } from './transfert-multiple.component';

describe('TransfertMultipleComponent', () => {
  let component: TransfertMultipleComponent;
  let fixture: ComponentFixture<TransfertMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
