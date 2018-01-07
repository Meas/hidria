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
import {AuthComponent} from './components/auth/auth.component';
import { SearchByCodeComponent } from './components/search-by-code/search-by-code.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';


const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'catalogue', component: CatalogueComponent, canActivate: [SecurityService] },
  { path: 'parameter', component: ParametersComponent, canActivate: [SecurityService] },
  { path: 'test-pdf', component: TestPdfComponent, canActivate: [SecurityService] },
  { path: 'details', component: FanDetailsComponent, canActivate: [SecurityService] },
  { path: 'choose-model/:slug', component: ChooseModelComponent, canActivate: [SecurityService] },
  { path: 'choose-model/operating-point/:id', component: OperatingPointComponent, canActivate: [SecurityService] },
  { path: 'my-projects', component: MyProjectsComponent, canActivate: [SecurityService] },
  { path: 'search-by-code', component: SearchByCodeComponent, canActivate: [SecurityService] },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
