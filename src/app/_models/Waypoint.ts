import {MapMarker} from './MapMarker';
export class Waypoint {

    location: MapMarker;

   constructor(mapMarker: MapMarker){
       this.location = mapMarker;
   }
}