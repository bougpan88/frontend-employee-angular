import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { routePaths } from '../../routes';
import { Employee } from '../../_models/EmployeeModel'
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AttributeService } from '../../services/attribute.service';
import { Attribute } from '../../_models/AttributeModel';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeRoute = routePaths.employeeRoute;
  attributesForm: FormArray;
  employeeForm: FormGroup;
  allEmployeeIds: Array<Number | null> = [];
  employAttributes : Array<Attribute> = [];
  employee: Employee = {};
  allAttributeNames : Array<String> = [];
  loading : boolean = true;

  constructor(private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private attributeService: AttributeService,
      private router: Router,
      private logger: NGXLogger
       ) {
     
      this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      hasCar: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      supervisorId: new FormControl(''),
      attributesForm: new FormArray([])
      });
      this.attributesForm = this.getFormArray();
   }

  ngOnInit(): void {
    const id : number = parseInt(this.route.snapshot.queryParamMap.get('id')!);
    this.loadFromBackend();
    if (id == null || Number.isNaN(id)){
      this.employee = new Employee();
    } else {
      this.getEmployee(id); 
    }
  }

  createAttribute(): void{
    const formgroup: FormGroup = new FormGroup({
      attributeName: new FormControl('', [Validators.required]),
      attributeValue: new FormControl('', [Validators.required])
    });
    const attributesArray: FormArray = this.getFormArray();
    attributesArray.push(formgroup);
  }

  getFormArray(): FormArray{
    return this.employeeForm.get('attributesForm') as FormArray;
  }

  removeAttribute(i: number){
    this.getFormArray().removeAt(i);
    this.validateAttributes();
  }

  onSubmit() {
    if(confirm("Are you sure you want to submit employee?")) {
    this.updateEmployeeFromForm();
    this.sendPersistEmployeeRequest(this.employee);
    }
  }

  /*
  This method is used to check if an attribute with the same name already exists in the form. 
  It then makes the form invalid.
  */
  validateAttributes() : void {

    this.updateEmployeeFromForm();
    //Creates a map that has as a key each attribute name and as a value how many times this attribute name occurs.
    const map = this.employAttributes.map((attribute)=>attribute.attributeName)
                                     .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    //This means we have at least a duplicate attribute
    if (this.employAttributes.length != 0 && map.size != this.employAttributes.length){
     const duplicateAttributes : Array<String> = [];
     //value represents how many duplicates for an attribute name was found
     //key represents the attribute name
     map.forEach((value: number, key: String)=> {
       this.logger.info(value);
       this.logger.info(key);
       if (value > 1){
         duplicateAttributes.push(key);
       }
     })
     for (let control of this.getFormArray().controls){
      if (duplicateAttributes.includes(control.get('attributeName')?.value)){
        control.get('attributeName')?.setErrors({ duplicate: { message: 'duplicate attribute :)'}});
      }
    }
    } else {
      for (let control of this.getFormArray().controls){
          control.get('attributeName')?.setErrors(null);
      } 
    }
  }

  /*
  This method is used to load data in the form from the backend.
  1st loads all available employee Ids. If this action is successfull it procceds to second step
  2nd loads all available attribute names
  */
  loadFromBackend() : void{

    this.loading = true;
    let promise1 = this.employeeService.getAllEmployeeIds().toPromise();
    let promise2 = this.attributeService.getAllAttributeNames().toPromise();

    Promise.all([promise1, promise2]).then((res)=>{
      this.mapEmployeeIdsFromBackend(res[0]);
      this.mapAttributeNamesFromBackend(res[1]);
      this.loading = false;
    });
  }

  mapEmployeeIdsFromBackend(res: any) :void {
    this.logger.info(res);
    this.allEmployeeIds = res;
    //In addition to allemployeeIds we need null also as a choise
    if (res != null){
    this.allEmployeeIds.splice(0, 0, null);
    }
  }

  mapAttributeNamesFromBackend(res: any) : void {
    this.logger.info(res);
    this.allAttributeNames = res;
  }

  updateEmployeeFromForm() : void {
    this.employee.name = this.employeeForm.get('name')?.value
    this.employee.address = this.employeeForm.get('address')?.value
    this.employee.hasCar = this.employeeForm.get('hasCar')?.value
    this.employee.birthDate = this.employeeForm.get('birthDate')?.value
    this.employee.hireDate = this.employeeForm.get('hireDate')?.value
    this.employee.supervisorId = this.employeeForm.get('supervisorId')?.value

    this.employAttributes = [];
    for (let control of this.getFormArray().controls){
      const attribute : Attribute = new Attribute();
      attribute.attributeName = control.get('attributeName')?.value;
      attribute.attributeValue = control.get('attributeValue')?.value;
      this.employAttributes.push(attribute);
    }
    this.employee.employeeAttributes = this.employAttributes;
    this.logger.info('persisting employee');
    this.logger.info(this.employee);
  }

  updateFormFromEmployee() : void {
    this.employeeForm.patchValue({
      name: this.employee.name,
      hireDate: this.employee.hireDate,
      address: this.employee.address,
      hasCar: this.employee.hasCar,
      birthDate: this.employee.birthDate,
      supervisorId: this.employee.supervisorId
    });
    if (this.employee.employeeAttributes != null){
      for (let attribute of this.employee.employeeAttributes) {
        let nameControl: FormControl = new FormControl('', [Validators.required]);
        let valueControl: FormControl = new FormControl('', [Validators.required]);
        nameControl.setValue(attribute.attributeName);
        valueControl.setValue(attribute.attributeValue);
        this.attributesForm.push(new FormGroup({
          attributeName: nameControl,
          attributeValue: valueControl
        }))
      }
    }
  }

  getEmployee(id: number) :void {
    this.employeeService.getEmployee(id).subscribe((resp: any)=> {
      this.logger.info(resp);
      this.employee = resp;
      this.updateFormFromEmployee();
    });
  }

  sendPersistEmployeeRequest(employee: Employee) : void {
    this.loading = true;
    const id : number | null | undefined = employee.id;
    if (id == null || Number.isNaN(id)){
    this.employeeService.createEmployee(employee).subscribe((resp: any)=> {
    //only after succesfull update let the employees view refresh
    this.loading = false;
    this.navigateNext(resp);
    });
  } else {
    this.employeeService.updateEmployee(employee, id).subscribe((resp: any)=> {
    //only after succesfull update let the employees view refresh
    this.loading = false;
    this.navigateNext(resp);
    });
  }
  }

  navigateNext(resp: any): void {
  this.logger.info(resp);
  this.router.navigate([routePaths.employeeRoute]);
  }

}
