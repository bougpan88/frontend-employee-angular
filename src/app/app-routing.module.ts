import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeTableComponent } from './attributes/attribute-table/attribute-table.component';
import { EmployeeTable } from './employees/employee-table/employee-table.component';
import { routePaths } from './routes';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { HomeComponent } from './home/home.component';
import { AttributeFormComponent } from './attributes/attribute-form/attribute-form.component';
import { GoogleMapComponent } from './map/google-map/google-map.component';
import { EmployeeFromAttributePickupComponent } from './map/employee-from-attribute-pickup/employee-from-attribute-pickup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard'
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: routePaths.homeRoute, component: HomeComponent, canActivate: [AuthGuard]},
  {path: routePaths.employeeFormRoute, component: EmployeeFormComponent, canActivate: [AuthGuard]},
  {path: routePaths.employeeRoute, component: EmployeeTable, canActivate: [AuthGuard]},
  {path: routePaths.attributeRoute, component: AttributeTableComponent, canActivate: [AuthGuard]},
  {path: routePaths.attributeFormRoute, component: AttributeFormComponent, canActivate: [AuthGuard]},
  {path: routePaths.mapRoute, component: EmployeeFromAttributePickupComponent, canActivate: [AuthGuard]},
  {path: routePaths.mapDirectionsRoute, component: GoogleMapComponent, canActivate: [AuthGuard]},
  {path: routePaths.profile, component: ProfileComponent,canActivate: [AuthGuard]},
  {path: routePaths.login, component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
