import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { LeftComponent } from './header/left/left.component';
import { RightComponent } from './header/right/right.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodySectionComponent } from './body-section/body-section.component';
import { ItemsComponent } from './items/items.component';
import { FormBoxComponent } from './form-box/form-box.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { TitleBoxComponent } from './title-box/title-box.component';
import { SwitchOptionsComponent } from './switch-options/switch-options.component';
import { AppRoutingModule } from ".././app-routing.module";
import { AccordionInputComponent } from './accordion-input/accordion-input.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FiltersComponent,
    LeftComponent,
    RightComponent,
    SidebarComponent,
    BodySectionComponent,
    ItemsComponent,
    FormBoxComponent,
    SelectBoxComponent,
    TitleBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
  ],
  exports: [
    HeaderComponent,
    FiltersComponent,
    SidebarComponent,
    BodySectionComponent,
    FormBoxComponent,
    SelectBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
  ]
})
export class SharedModule { }
