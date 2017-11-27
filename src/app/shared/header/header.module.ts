import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
