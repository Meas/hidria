import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';
import { OperatingPointComponent } from './components/operating-point/operating-point.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

import {SecurityService} from './services/security/security.service';


const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  // { path: 'parameter', component: ParametersComponent, canActivate: [SecurityService] },
  { path: 'parameter', component: ParametersComponent },
  { path: 'test-pdf', component: TestPdfComponent },
  { path: 'details', component: FanDetailsComponent },
  { path: 'choose-model/:slug', component: ChooseModelComponent },
  { path: 'choose-model/operating-point/:id', component: OperatingPointComponent },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
