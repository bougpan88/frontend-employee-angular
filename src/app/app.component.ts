import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routePaths } from './routes';
import {
  OnInit,
  Renderer2,
  HostListener,
  Inject,
  ViewChild
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employer-angular';

  employeeRoute = routePaths.employeeRoute;
  attributesRoute = routePaths.attributeRoute;
  mapRoute = routePaths.mapRoute;
  homeRoute = routePaths.homeRoute;
  loginRoute = routePaths.login;
  profileRoute = routePaths.profile;

  constructor(private rooter: Router,
              private authService: AuthService){}

  logout() : void {
    this.authService.logout();
    this.rooter.navigateByUrl(this.loginRoute)
  }


}