import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutingModule} from "../../app-routing.module";
import {LeftComponent} from "./left/left.component";
import {RightComponent} from "./right/right.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LeftComponent,
    RightComponent
  ]
})
export class HeaderModule { }
