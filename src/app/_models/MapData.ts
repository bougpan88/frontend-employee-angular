import {MapMarker} from './MapMarker';
import {Waypoint} from './Waypoint';
export class MapData {

   constructor(public origin: MapMarker,
               public destination: MapMarker,
               public waypoints: Array<Waypoint>
               ){
   }
}