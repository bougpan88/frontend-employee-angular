import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTable } from './employee-table.component';

describe('TableComponent', () => {
  let component: EmployeeTable;
  let fixture: ComponentFixture<EmployeeTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
