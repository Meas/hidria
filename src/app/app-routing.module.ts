import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAComponent} from "./components/view-a/view-a.component";
import {ViewBComponent} from "./components/view-b/view-b.component";


const routes: Routes = [
  { path: '', redirectTo: '/a', pathMatch: 'full' },
  { path: 'a', component: ViewAComponent },
  { path: 'b', component: ViewBComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
