import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AttributeService } from '../../services/attribute.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Employee } from '../../_models/EmployeeModel';
import { EmployeeService } from '../../services/employee.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import {routePaths} from '../../routes';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-from-attribute-pickup',
  templateUrl: './employee-from-attribute-pickup.component.html',
  styleUrls: ['./employee-from-attribute-pickup.component.css']
})
export class EmployeeFromAttributePickupComponent implements OnInit, OnDestroy {

  mapDirectionsRoute = '/' + routePaths.mapDirectionsRoute;
  allAttributeNames : Array<String> = [];
  dataSource = new MatTableDataSource<Employee>();
  selection = new SelectionModel<Employee>(false, []);
  displayedColumns: string[] = ['id', 'name', 'hireDate', 'address','hasCar','birthDate','supervisorId'];
  loading : boolean = false;

  allAttributeNamesSubscription : Subscription | undefined;
  employeesWithAttributeSubscription : Subscription | undefined;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  
  private selectedEmployeeId : number | undefined = undefined;

  public findFromAttributeForm : FormGroup = new FormGroup({
    attributeName : new FormControl('', [Validators.required]),
    attributeValue: new FormControl('', [Validators.required])});

  constructor(private attributeService: AttributeService,
              private employeeService: EmployeeService,
              private logger: NGXLogger) {}
  
  ngOnDestroy(): void {
    this.allAttributeNamesSubscription?.unsubscribe();
    this.employeesWithAttributeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllAttributeNames();
  }

  ngAfterViewInit(){
    if (this.paginator != null){
    this.dataSource.paginator = this.paginator;
    }
  }

  getAllAttributeNames(): void {
    this.allAttributeNamesSubscription = this.attributeService.getAllAttributeNames().subscribe((resp: any)=> {
      this.logger.info(resp);
      this.allAttributeNames = resp;
    });
  }

  getAllEmployeesWithAttribute(attributeName : string, attributeValue : string) :void {
    this.loading = true;
    this.employeesWithAttributeSubscription = this.employeeService.getAllEmployeesWithAttribute(attributeName, attributeValue).subscribe((resp: any)=> {
      this.logger.info(resp);
      this.dataSource.data = resp;
      this.loading = false;
    });
  }


  onSubmit() : void {
    this.findFromAttributeForm.get("attributeName")?.markAsTouched();
    this.findFromAttributeForm.get("attributeValue")?.markAsTouched();
    if (this.findFromAttributeForm.valid){
      let attributeName: string = this.findFromAttributeForm.get('attributeName')?.value;
      let attributeValue: string = this.findFromAttributeForm.get('attributeValue')?.value;

      this.getAllEmployeesWithAttribute(attributeName, attributeValue.trim());
    }
  }

}
