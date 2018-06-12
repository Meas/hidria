import { AddToProjectComponent } from './add-to-project/add-to-project.component';
import { MyProjectsModelListComponent } from './my-projects-model-list/my-projects-model-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';
import { FilterByStringPipe } from '../pipes/filter-by-string/filter-by-string.pipe';
import { SortByStringPipe } from '../pipes/sort-by-string/sort-by-string.pipe';
import { DataTableComponent } from './data-table/data-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ChooseModelTableComponent } from './choose-model-table/choose-model-table.component';
import { ChooseModelTableHorizontalComponent } from './choose-model-table-horizontal/choose-model-table-horizontal.component';
import { LegendComponent } from './legend/legend.component';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';
import { SearchPipe } from '../pipes/filter/filter.pipe';
import { SortPipe } from '../pipes/sort/sort.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://13.93.51.225/hidriaAPI/api/translation/', '');
}

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
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
    AddToProjectComponent,
    ComparisonTableComponent,
    DataTableComponent,
    UsersTableComponent,
    ChooseModelTableComponent,
    ChooseModelTableHorizontalComponent,
    LegendComponent,
    SwitchButtonComponent,
    ProjectSelectionComponent,
    SearchPipe,
    SortPipe
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
    AddToProjectComponent,
    ComparisonTableComponent,
    TranslateModule,
    DataTableComponent,
    UsersTableComponent,
    ChooseModelTableComponent,
    ChooseModelTableHorizontalComponent,
    LegendComponent,
    SwitchButtonComponent,
    ProjectSelectionComponent,
    SearchPipe,
    SortPipe
  ],
  providers: [
    ChartServiceService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
