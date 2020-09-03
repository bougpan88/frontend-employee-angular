import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routePaths } from '../routes'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  homeRoute : string = routePaths.homeRoute;
  authForm: FormGroup = new FormGroup({
    userNameControl: new FormControl('', [Validators.required]),
    passwordControl: new FormControl('', [Validators.required])
});;
  isSubmitted  =  false;
  loading = false;

  constructor(private authService: AuthService,
    private router :Router,
    private route: ActivatedRoute,
    private logger: NGXLogger) { }

  ngOnInit() {}

get formControls() { return this.authForm.controls; }

onSubmit() {
  this.logger.info('submitted');
  this.isSubmitted = true;
  // stop here if form is invalid
  if (this.authForm.invalid) {
      return;
  }
  this.loading = true;
  this.authService.login(this.authForm.get('userNameControl')?.value,
                         this.authForm.get('passwordControl')?.value)
      .pipe(catchError((): Observable<any> => {
        this.loading = false;
        this.authForm.setErrors({ authError: { failed: true}});
        return throwError('Authorization failed');
      }))
       .subscribe((user : any)=>{
            this.logger.info('user retrieved from backend');
            this.logger.info(user);
              // store jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            if (this.authService.lastRequestedUrl != null){
            this.router.navigate([this.authService.lastRequestedUrl]);
            } else {
              this.router.navigate([routePaths.homeRoute]);
            }
            this.loading = false;
        });
   }

}
