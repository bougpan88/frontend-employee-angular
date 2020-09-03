import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  lastRequestedUrl : string | undefined;

  constructor(private http: HttpClient,
              private customErrorHandler : CustomErrorHandlerService,
              private logger: NGXLogger) {}

  login(username: string, password: string) {
    this.logger.info('authentication with username: '+username);
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username, password }); 
}

logout() {
    // remove token from local storage to log user out
    localStorage.removeItem('user');
}

}