import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftComponent} from "./left/left.component";
import {RightComponent} from "./right/right.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LeftComponent,
    RightComponent
  ]
})
export class HeaderModule { }
