import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NvD3Module } from 'ng2-nvd3';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';
import { OperatingPointComponent } from './components/operating-point/operating-point.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UsersComponent } from './components/users/users.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminComponent } from './components/admin/admin.component';

import { MainService } from './services/main.service';
import { CatalogueService } from './services/catalogue/catalogue.service';
import { HelperService } from './services/helper/helper.service';
import { SecurityService } from './services/security/security.service';
import { SelectionService } from './services/selection/selection.service';
import { AuthService } from './services/auth/auth.service';
import { ChooseModelService } from './services/chooseModel/chooseModel.service';
import { OperatingPointService } from './services/operating-point/operating-point.service';
import { SearchByCodeService } from './services/search-by-code/search-by-code.service';
import { CustomNotificationsService } from './services/notifications/notifications.service';
import { MyProjectsService } from './services/my-projects/my-projects.service';
import { ComparisonService } from './services/comparison/comparison.service';
import { UserService } from './services/user/user.service';
import { StatisticsService } from './services/statistics/statistics.service';

import { FilterPipe } from './pipes/filter/filter.pipe';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { AppState } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ParametersComponent,
    FanDetailsComponent,
    ChooseModelComponent,
    FilterPipe,
    OperatingPointComponent,
    RouteNotFoundComponent,
    MyProjectsComponent,
    ComparisonComponent,
    StatisticsComponent,
    UsersComponent,
    HistoryComponent,
    AdminComponent,
    AuthComponent,
    ChangePasswordComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NvD3Module,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxsModule.forRoot([
      AppState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot()
  ],
  providers: [
    MainService,
    HelperService,
    CatalogueService,
    SecurityService,
    SelectionService,
    AuthService,
    ChooseModelService,
    OperatingPointService,
    SearchByCodeService,
    CustomNotificationsService,
    MyProjectsService,
    ComparisonService,
    UserService,
    StatisticsService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
