import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// import 'd3';
// import 'nvd3';

import { NvD3Module } from 'ng2-nvd3';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';
import { ChartComponent } from './components/chart/chart.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';

import { MainService } from './services/main.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ParametersComponent,
    TestPdfComponent,
    FanDetailsComponent,
    ChartComponent,
    ChooseModelComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NvD3Module
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
