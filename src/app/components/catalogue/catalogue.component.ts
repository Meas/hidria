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

  slug = 'all';
  sections = [
    {
      slug: 'ac_axial_fans',
      title: 'AC Axial fans',
      items: [
        {
          slug: 'slick_blades',
          title: 'AC Axial fans | Slick Blades',
          description: 'Sickled blades',
          items: [
            {
              slug: 'item_1',
              title: 'Test 1',
              description: 'Desc',
              items: []
            },
            {
              slug: 'item_2',
              title: 'Test 2',
              description: 'Desc',
              items: []
            }
          ]
        },
        {
          slug: 'slick_blades_1',
          title: 'AC Axial fans',
          description: 'Blades with composite material (PP/AP)es',
          items: []
        },
        {
          slug: 'slick_blades_2',
          title: 'AC Axial fans',
          description: 'Paddle blades',
          items: []
        },
        {
          slug: 'slick_blades_3',
          title: 'UL listed Axial Fans',
          description: '',
          items: []
        }
      ]
    },
    {
      slug: 'ec_axial_fans',
      title: 'EC Axial fans',
      items: [
        {
          slug: 'slick_blades_5',
          title: 'H-ROOF fans',
          description: '',
          items: []
        },
        {
          slug: 'slick_blades_6',
          title: 'H-TUBE fans',
          description: '',
          items: []
        },
        {
          slug: 'slick_blades_7',
          title: 'SQUARE PLATE fans',
          description: '',
          items: []
        }
      ]
    },
    {
      slug: 'axial_fans_for_ventialtion',
      title: 'Axial fans for Ventilation',
      items: [
        {
          slug: 'slick_blades_8',
          title: 'H-ROOF fans',
          description: '',
          items: []
        },
        {
          slug: 'slick_blades_9',
          title: 'H-TUBE fans',
          description: '',
          items: []
        }
      ]
    },
    {
      slug: 'ec_axial_fans_2',
      title: 'EC Axial fans 2',
      items: [
        {
          slug: 'slick_blades_10',
          title: 'Test',
          description: 'Desc',
          items: []
        },
        {
          slug: 'slick_blades_11',
          title: 'Test',
          description: 'Desc',
          items: []
        }
      ]
    }
  ];
  feature= [];
  subSections = [];

  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.catalogueService.getItems().subscribe((response: any) => {
      this.feature=response;
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
    this.router.navigate(['choose-model', event.slug]);
  }

  onFilterSelected(event): void {
    console.log(event);
    this.slug = event;
    this.subSections = [];
  }
}
