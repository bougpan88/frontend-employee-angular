import {routePaths} from '../../routes';
import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Employee } from '../../_models/EmployeeModel';
import { EmployeeService } from '../../services/employee.service';
import {CdkDetailRowDirective} from './cdk-detail-row.directive'
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

/**
 * @title Table
 */
@Component({
  selector: 'employee-table',
  styleUrls: ['employee-table.component.css'],
  templateUrl: 'employee-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeTable implements OnInit, OnDestroy, AfterViewInit {
  
  employeeRoute = routePaths.employeeRoute;
  employeeFormRoute = '/' + routePaths.employeeFormRoute;
  displayedColumns: string[] = ['id', 'name', 'hireDate', 'address','hasCar','birthDate','supervisorId'];
  ELEMENT_DATA: Array<Employee> = [];
  dataSource = new MatTableDataSource<Employee>();
  loading : boolean = true;
  
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  getAllEmployeesSubscription : Subscription | undefined;
  deleteEmployeeSubscription : Subscription | undefined;

  constructor(private employeeService : EmployeeService,
              private logger: NGXLogger) {
     
   }
  ngOnDestroy(): void {
    this.deleteEmployeeSubscription?.unsubscribe();
    this.getAllEmployeesSubscription?.unsubscribe();
  }

  isExpansionDetailRow = (index: any, row : any) => row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.getAllEmployees();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAllEmployees() :void {
    this.loading = true;
    this.getAllEmployeesSubscription = this.employeeService.getAllEmployees().subscribe((resp: any)=> {
      if (resp == null){
        resp = [];
      }
      this.logger.info(resp);
      this.ELEMENT_DATA = resp;
      this.dataSource.data = this.ELEMENT_DATA;
      this.loading = false;
    });
  }

  deleteEmployee(id: number) :void {
    this.loading = true;
      if(confirm("Are you sure you want to delete employee with Id "+ id + "?")) {
        this.deleteEmployeeSubscription = this.employeeService.deleteEmployee(id).subscribe((resp: any)=> {
          this.logger.info(resp);
          this.loading = false;
        });
      }
    }

}