import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { NGXLogger } from 'ngx-logger';
import { CustomErrorHandlerService } from './custom-error-handler.service'

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient,
              private customErrorHandler : CustomErrorHandlerService) { }

  public getAllAttributeNames(): Observable<any> {
    return this.http.get<Array<String>>(environment.apiUrl + '/attributes/names')
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)));
  }

  public createAttribute(attributeName : String) : Observable<any> {
    return this.http.post<Array<String>>(environment.apiUrl + '/attributes', {name: attributeName})
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)));
  }

  public updateAttribute(oldAttributeName : String, newAttributeName : String) : Observable<any> {
    return this.http.put<Array<String>>(environment.apiUrl + '/attributes/' + oldAttributeName, {name: newAttributeName})
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)));
  }

  public deleteAttribute(name: String): Observable<any> {
    return this.http.delete<Error>(environment.apiUrl + '/attributes/' + name)
    .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error)));
  }

}
