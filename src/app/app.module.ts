import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NvD3Module } from 'ng2-nvd3';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';
import { OperatingPointComponent } from './components/operating-point/operating-point.component';

import { MainService } from './services/main.service';
import { CatalogueService } from './services/catalogue/catalogue.service';
import { HelperService } from './services/helper/helper.service';
import { SecurityService } from './services/security/security.service';
import { SelectionService } from './services/selection/selection.service';
import { AuthService } from './services/auth/auth.service';
import { ChooseModelService } from './services/chooseModel/chooseModel.service';
import { OperatingPointService } from './services/operating-point/operating-point.service';
import { SearchByCodeService } from './services/search-by-code/search-by-code.service';
import { ErrorMessagesService } from './services/error-messages/error-messages.service';

import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { SearchByCodeComponent } from './components/search-by-code/search-by-code.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ParametersComponent,
    TestPdfComponent,
    FanDetailsComponent,
    ChooseModelComponent,
    FilterPipe,
    SortPipe,
    OperatingPointComponent,
    RouteNotFoundComponent,
    AuthComponent,
    SearchByCodeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NvD3Module,
    HttpClientModule,
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
    ErrorMessagesService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
