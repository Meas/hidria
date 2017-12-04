import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';


const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'parameter', component: ParametersComponent },
  { path: 'test-pdf', component: TestPdfComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
