import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carBooleanTransform'
})
export class CarBooleanTransformPipe implements PipeTransform {

  transform(value: Boolean, args?: any): String | undefined {
    if (value === true){
      return 'yes';
    } else if (value === false) {
      return 'no';
    } else {
      return undefined;
    }
  }

}
