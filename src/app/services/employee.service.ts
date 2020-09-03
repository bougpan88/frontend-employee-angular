import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Employee} from '../_models/EmployeeModel'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { CustomErrorHandlerService } from './custom-error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
              private customErrorHandler : CustomErrorHandlerService) { }

  public getEmployee(id: number) :Observable<any>{
    return this.http.get<Employee>(environment.apiUrl + '/employees/' + id)
               .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
               );
  }

  public getAllEmployees(): Observable<any> {
    return this.http.get<Array<Employee>>(environment.apiUrl + '/employees')
               .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
               );
  }

  public getAllEmployeeIds(): Observable<any> {
    return this.http.get<Array<Number>>(environment.apiUrl + '/employees/ids')
               .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
               );
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.http.delete<Error>(environment.apiUrl + '/employees/' +id)
               .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
               );
  }

  public updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<Error>(environment.apiUrl + '/employees', employee)
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
    );
  }

  public createEmployee(employee: Employee): Observable<any> {
    return this.http.post<Error>(environment.apiUrl + '/employees', employee)
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
    );
  }

  public getAllEmployeesWithAttribute(attributeName : string, attributeValue : string) : Observable<any> {
    let params = new HttpParams().set("attributeName",attributeName).set("attributeValue", attributeValue);
    return this.http.get<Array<Employee>>(environment.apiUrl + '/employees/search',
    {
      params: params
    })
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)) 
    );
  }

}
