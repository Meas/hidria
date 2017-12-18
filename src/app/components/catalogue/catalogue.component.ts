import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {CatalogueService} from "../../services/catalogue/catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  categoryId = 0;
  feature = [];
  subSections = [];

  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.catalogueService.getItems().subscribe((response: any) => {
      this.feature = response;
      console.log(this.feature)
    });
  }

  onSectionSelected(subCategory): void {
    /*this.sections.forEach(section => {
      section.items.forEach((item) => {
        console.log(slug, item.slug);
        if (item.slug === slug) {
          this.subSections = [item];
        }
      });
    });*/
    console.log(subCategory);
    this.subSections = subCategory;
  }

  onItemSelected(event): void {
    this.router.navigate(['choose-model', event.id]);
  }

  onFilterSelected(event): void {
    console.log(event);
    this.categoryId = event;
    this.subSections = [];
  }
}
