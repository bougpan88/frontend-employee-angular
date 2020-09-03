import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../../services/attribute.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routePaths } from '../../routes';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit {

  attributeForm: FormGroup;
  attributeRoute = routePaths.attributeRoute;
  allAttributeNames : Array<String> = [];

  constructor(private route: ActivatedRoute,
              private attributeService: AttributeService,
              private router: Router,
              private logger: NGXLogger) { 

    this.attributeForm = new FormGroup({
      name: new FormControl('', [Validators.required])});
  }

  ngOnInit(): void {
    const name : string = this.route.snapshot.queryParamMap.get('name')!;
    if (name != null && name != ""){
      this.attributeForm.get('name')?.setValue(name);
    } 
    this.getAllAttributeNames();
  }

  getAllAttributeNames(): void {
    this.attributeService.getAllAttributeNames().subscribe((resp: any)=> {
      this.logger.info(resp);
      this.allAttributeNames = resp;
    });
  }

  validateForDuplicate() : void {
    const atributeName : string = this.attributeForm.get('name')?.value;
    this.logger.info(atributeName);
    if (this.allAttributeNames.includes(atributeName)){
      this.attributeForm.get('name')?.setErrors({ duplicate: { message: 'duplicate attribute :)'}});
    } else {
      this.attributeForm.get('name')?.setErrors(null);
    }
  }

    onSubmit() {
      if(confirm("Are you sure you want to submit attribute?")) {
      this.sendPersistAttributeRequest(this.attributeForm.get('name')?.value);
      }
    }

    sendPersistAttributeRequest(newAttributeName: String) : void {
      const oldAttributename : string = this.route.snapshot.queryParamMap.get('name')!;
    if (oldAttributename != null && oldAttributename != ""){
      this.attributeService.updateAttribute(oldAttributename, newAttributeName).subscribe((resp: any)=> {
        //only after succesfull update let the attributes view refresh
        this.logger.info(resp);
        this.navigateNext();
      });
    } else {
      this.attributeService.createAttribute(newAttributeName).subscribe((resp: any)=> {
        //only after succesfull create let the attributes view refresh
        this.logger.info(resp);
        this.navigateNext();
        });
      }
    }
  
    navigateNext(): void {
      this.router.navigate([routePaths.attributeRoute]);
      }

}
