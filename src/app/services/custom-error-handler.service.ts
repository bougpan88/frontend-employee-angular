import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { routePaths } from '../routes';


//  All services that used this method as
// .pipe(catchError(this.customErrorHandler.handleHttpError) failed because Router was not injected inside CustomErrorHandlerService during the call
//  Solution was https://stackoverflow.com/questions/55924204/cant-inject-router-into-httpinterceptor-angular-7
// .pipe(catchError((error: HttpErrorResponse) => this.customErrorHandler.handleHttpError(error))
// This was a scope error
// Passing a function as a parameter makes the this reference of the passed function to be the this of the executable context of the outer function
@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {

  loginRoute = routePaths.login;

  constructor(private router : Router,
              private logger: NGXLogger) {}

  //  This is a custom method that we use to handle http response errors in our application
    handleHttpError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      this.logger.error('An error occurred:', error.error.message);
    } else {
      this.logger.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    //If authentication fails during a call at the backend, then the JWT is out of date. In that case we must remove the token
    //so the user can authenticate again and request a new token
    if (error.status === 401){
      localStorage.removeItem('user');
      this.router.navigateByUrl(this.loginRoute)
    }
     return throwError('Something bad happened; please try again later.');
  }

}
