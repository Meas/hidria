import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../../services/catalogue/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  categoryId = 0;
  series = 0;

  feature = [];
  subSections = [];

  constructor(private catalogueService: CatalogueService, private router: Router) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.catalogueService.getItems().subscribe((response) => {
      this.feature = response;
    });
  }

  onSectionSelected(subCategory, id): void {
    this.subSections = subCategory;
    this.series = id;
  }

  onItemSelected(event): void {
    this.router.navigate(['choose-model', event.id], {queryParams: {series: this.series}});
  }

  onFilterSelected(event): void {
    if (event === -1) {
      this.categoryId = 0;
    } else {
      this.categoryId = event;
      this.subSections = [];
    }
  }
}
