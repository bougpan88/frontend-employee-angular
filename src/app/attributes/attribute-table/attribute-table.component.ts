import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeService } from '../../services/attribute.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { routePaths } from '../../routes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.css']
})
export class AttributeTableComponent implements OnInit {

  // These here are needed for infinite scroll
  array : any[] = [];
  sum = 70;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  //untill here are for infinite scroll

  allAttributeNames : Array<String> = [];
  attributeFormRoute = '/' + routePaths.attributeFormRoute;
  attributesRoute = routePaths.attributeRoute;
  loading : boolean = true;
  filterForm : FormGroup;

  constructor(private attributeService: AttributeService,
              private logger: NGXLogger) {
      this.filterForm = new FormGroup({
        filterValue: new FormControl('', [Validators.required])});
    }

  ngOnInit(): void {
    this.getAllAttributeNames();
  }

  getAllAttributeNames(): void {
    this.loading = true;
    this.attributeService.getAllAttributeNames().subscribe((resp: any)=> {
      if (resp == null){
        resp = [];
      }
      this.logger.info(resp);
      this.allAttributeNames = resp;
      this.array = this.allAttributeNames.slice(0, this.sum);
      this.loading = false;
    });
  }

  ngOnDestroy() {
  }

  deleteAttribute(name: String) :void {
    if(confirm("Are you sure you want to delete attribute "+ name + "?")) {
      this.loading = true;
      this.attributeService.deleteAttribute(name).subscribe((resp: any)=> {
        this.logger.info(resp);
        this.loading = false;
      });
    }
  }

  //This method here is used for infinite scroll
  onScrollDown () {
    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.array = this.allAttributeNames.slice(0, this.sum);
  
    this.direction = 'down'
  }

  updateShownAttributes() : void {
    const currentFiltervalue : string = this.filterForm.controls['filterValue'].value;
    if (currentFiltervalue != ''){
    this.array = this.allAttributeNames.filter((element)=> {return element === currentFiltervalue});
    } else {
    this.array = this.allAttributeNames.slice(0, this.sum);
    }
  }

}
