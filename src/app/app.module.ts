import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ParametersComponent,
    TestPdfComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
