import { Component, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../_models/EmployeeModel';
import { ActivatedRoute } from '@angular/router';
import { MapMarker } from '../../_models/MapMarker'
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';
import { MapData } from '../../_models/MapData';
//import { MapInfoWindow, MapMarker } from '@angular/google-maps'
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Waypoint } from '../../_models/Waypoint';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {

  allDataReady : boolean = false;
  private origin: MapMarker = new MapMarker();
  private destination : MapMarker = new MapMarker();
  private allEmployees: Array<Employee> = [];
  private waypoints : Array<Waypoint> = [];
  private mapData : MapData = new MapData(this.origin, this.destination, this.waypoints);

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private logger: NGXLogger){
              }

  ngOnInit(): void {
  const attributeName : string = this.route.snapshot.queryParamMap.get('attributeName')!;
  const attributeValue : string = this.route.snapshot.queryParamMap.get('attributeValue')!;
  this.getAllEmployeesWithAttribute(attributeName, attributeValue);
  }

  async getAllEmployeesWithAttribute(attributeName : string, attributeValue : string) {
    this.allDataReady = false;
   await this.employeeService.getAllEmployeesWithAttribute(attributeName, attributeValue).toPromise().then((resp: any)=> {
      this.logger.info(resp);
      this.allEmployees = resp;
      this.loadCoordinates();
      this.origin = this.mapData.origin;
      this.destination = this.mapData.destination
      this.allDataReady = true;
    });
  }

  loadCoordinates() : void{
    const id : number = parseInt(this.route.snapshot.queryParamMap.get('id')!);

    for(let employee of this.allEmployees){
      let marker : MapMarker = JSON.parse(employee.address as string);
      marker.label = employee.name as string;
    if (employee.id === id){
      this.mapData.origin = marker;
      this.logger.info("Origin is");
    } else {
      let waypoint = new Waypoint(marker);
      this.mapData.waypoints.push(waypoint);
    }
    this.logger.info(marker);
    this.logger.info("Waypoint is");
  }
  //Destination will be the last waypoint
  this.mapData.destination = this.mapData?.waypoints[this.mapData.waypoints.length-1]?.location;
  }


}
