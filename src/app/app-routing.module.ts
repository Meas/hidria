import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';
import {FanDetailsComponent} from './components/fan-details/fan-details.component';
import {ChooseModelComponent} from "./components/choose-model/choose-model.component";


const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'parameter', component: ParametersComponent },
  { path: 'test-pdf', component: TestPdfComponent },
  { path: 'details', component: FanDetailsComponent },
  { path: 'choose-model', component: ChooseModelComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
