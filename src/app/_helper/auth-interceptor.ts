import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private logger: NGXLogger) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try{
    const user : User = JSON.parse(localStorage.getItem('user')!);
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer {"token": "${user?.jwtToken}"}`
      },
    });
    return next.handle(req);
  } catch (error){
    this.logger.error(error);
    throw error;
  }
  }
}