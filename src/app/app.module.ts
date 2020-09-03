import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttributeTableComponent } from './attributes/attribute-table/attribute-table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';


import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule,} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule,} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GoogleMapsAPIWrapper} from '@agm/core';

import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeeTable} from './employees/employee-table/employee-table.component';

import {CdkDetailRowDirective} from '../app/employees/employee-table/cdk-detail-row.directive';
import '../polyfills';
import { DateFormatPipe } from './_helper/date-format.pipe';
import { CarBooleanTransformPipe } from './_helper/car-boolean-transform.pipe';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { HomeComponent } from './home/home.component';
import { AttributeFormComponent } from './attributes/attribute-form/attribute-form.component';
import { GoogleMapComponent } from './map/google-map/google-map.component';
import { EmployeeFromAttributePickupComponent } from './map/employee-from-attribute-pickup/employee-from-attribute-pickup.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './_helper/auth-interceptor';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AttributeTableComponent,
    EmployeeTable,
    DateFormatPipe,
    CdkDetailRowDirective,
    CarBooleanTransformPipe,
    EmployeeFormComponent,
    HomeComponent,
    AttributeFormComponent,
    GoogleMapComponent,
    EmployeeFromAttributePickupComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: '',
    }),
   LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
   InfiniteScrollModule,
   AgmDirectionModule,      // agm-direction
    FlexLayoutModule,
    MatIconModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatProgressSpinnerModule],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
      deps : [NGXLogger]
    }, DateFormatPipe, CarBooleanTransformPipe, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
