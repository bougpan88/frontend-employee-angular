import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFromAttributePickupComponent } from './employee-from-attribute-pickup.component';

describe('EmployeeFromAttributePickupComponent', () => {
  let component: EmployeeFromAttributePickupComponent;
  let fixture: ComponentFixture<EmployeeFromAttributePickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFromAttributePickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFromAttributePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
