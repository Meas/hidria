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
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'parameter', component: ParametersComponent },
  { path: 'details', component: FanDetailsComponent },
  { path: 'choose-model/:slug', component: ChooseModelComponent },
  { path: 'choose-model', component: ChooseModelComponent },
  { path: 'choose-model/operating-point/:id', component: OperatingPointComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'comparisons', component: ComparisonComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'users/edit', component: AdminComponent },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
