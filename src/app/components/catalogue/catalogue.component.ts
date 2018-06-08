import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../../services/catalogue/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  categoryId = -1;
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
    this.categoryId = -2;
  }

  onItemSelected(event): void {
    this.router.navigate(['choose-model', event.id]);
  }

  onFilterSelected(event): void {
    this.categoryId = event;
    this.subSections = [];
  }
}
