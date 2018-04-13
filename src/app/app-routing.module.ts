import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';
import { OperatingPointComponent } from './components/operating-point/operating-point.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

import {SecurityService} from './services/security/security.service';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {UsersComponent} from './components/users/users.component';
import {HistoryComponent} from './components/history/history.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthComponent} from './components/auth/auth.component';


const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'catalogue', component: CatalogueComponent, canActivate: [SecurityService] },
  { path: 'parameter', component: ParametersComponent, canActivate: [SecurityService] },
  { path: 'details', component: FanDetailsComponent, canActivate: [SecurityService] },
  { path: 'choose-model/:slug', component: ChooseModelComponent, canActivate: [SecurityService] },
  { path: 'choose-model', component: ChooseModelComponent, canActivate: [SecurityService] },
  { path: 'choose-model/operating-point/:id', component: OperatingPointComponent, canActivate: [SecurityService] },
  { path: 'my-projects', component: MyProjectsComponent, canActivate: [SecurityService] },
  { path: 'comparisons', component: ComparisonComponent, canActivate: [SecurityService] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [SecurityService] },
  { path: 'users', component: UsersComponent, canActivate: [SecurityService] },
  { path: 'history', component: HistoryComponent, canActivate: [SecurityService] },
  { path: 'users/edit', component: AdminComponent, canActivate: [SecurityService] },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
