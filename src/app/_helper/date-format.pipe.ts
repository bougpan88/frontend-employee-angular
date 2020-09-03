import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/*
This pipe is used to print dates in a greek format that we understand best
*/
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    return super.transform(value, "dd/MM/yyyy");
 }

}
