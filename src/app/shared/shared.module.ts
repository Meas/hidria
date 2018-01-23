import { AddToProjectComponent } from './add-to-project/add-to-project.component';
import { MyProjectsModelListComponent } from './my-projects-model-list/my-projects-model-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import {HeaderComponent} from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodySectionComponent } from './body-section/body-section.component';
import { ItemsComponent } from './items/items.component';
import { FormBoxComponent } from './form-box/form-box.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { TitleBoxComponent } from './title-box/title-box.component';
import { SwitchOptionsComponent } from './switch-options/switch-options.component';
import { AppRoutingModule } from '.././app-routing.module';
import { AccordionInputComponent } from './accordion-input/accordion-input.component';
import { FanInfoComponent } from './fan-info/fan-info.component';
import { TabsComponent } from './tabs/tabs.component';
import { FooterComponent } from './footer/footer.component';
import { LabelBoxComponent } from './label-box/label-box.component';
import { FeatureItemsComponent } from './feature-items/feature-items.component';
import { ChartComponent } from './chart/chart.component';
import { OperatingPointsInputsComponent } from './operating-points-inputs/operating-points-inputs.component';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { LoadingComponent } from './loading/loading.component';
import { DisplayOptionsComponent } from './display-options/display-options.component';
import { ChartAreaComponent } from './chart-area/chart-area.component';
import {ChartServiceService} from '../services/chart-service/chart-service.service';
import { ChartPerformanceCurveComponent } from './chart-performance-curve/chart-performance-curve.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalComponent } from './modal/modal.component';
import { SearchMyProjectsComponent } from './search-my-projects/search-my-projects.component';
import { MyProjectsListComponent } from './my-projects-list/my-projects-list.component';
import { MyProjectsTitleComponent } from './my-projects-title/my-projects-title.component';
import { FilterByStringPipe } from '../pipes/filter-by-string/filter-by-string.pipe';
import { SortByStringPipe } from '../pipes/sort-by-string/sort-by-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    Ng2AutoCompleteModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FiltersComponent,
    SidebarComponent,
    BodySectionComponent,
    ItemsComponent,
    FormBoxComponent,
    SelectBoxComponent,
    TitleBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
    FanInfoComponent,
    TabsComponent,
    FooterComponent,
    LabelBoxComponent,
    FeatureItemsComponent,
    ChartComponent,
    OperatingPointsInputsComponent,
    ParameterListComponent,
    LoadingComponent,
    DisplayOptionsComponent,
    ChartAreaComponent,
    ChartPerformanceCurveComponent,
    NotificationsComponent,
    ModalComponent,
    SearchMyProjectsComponent,
    MyProjectsListComponent,
    MyProjectsTitleComponent,
    MyProjectsModelListComponent,
    FilterByStringPipe,
    SortByStringPipe,
    AddToProjectComponent
  ],
  exports: [
    HeaderComponent,
    FiltersComponent,
    ItemsComponent,
    SidebarComponent,
    BodySectionComponent,
    FormBoxComponent,
    SelectBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
    FanInfoComponent,
    TabsComponent,
    FooterComponent,
    ChartComponent,
    OperatingPointsInputsComponent,
    ParameterListComponent,
    LoadingComponent,
    DisplayOptionsComponent,
    ChartAreaComponent,
    ChartPerformanceCurveComponent,
    NotificationsComponent,
    ModalComponent,
    SearchMyProjectsComponent,
    MyProjectsListComponent,
    MyProjectsTitleComponent,
    MyProjectsModelListComponent,
    LabelBoxComponent,
    AddToProjectComponent
  ],
  providers: [
    ChartServiceService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
