import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  sections = [
    {
      slug: 'ac_axial_fans',
      title: 'AC Axial fans',
      items: [
        {
          slug: 'slick_blades',
          title: 'Test',
          description: 'Desc',
          items: [
            {
              title: 'Test 1',
              description: 'Desc'
            },
            {
              title: 'Test 1',
              description: 'Desc'
            }
          ]
        },
        {
          slug: 'slick_blades_1',
          title: 'Test',
          description: 'Desc'
        },
        {
          slug: 'slick_blades_2',
          title: 'Test',
          description: 'Desc'
        },
        {
          slug: 'slick_blades_3',
          title: 'Test',
          description: 'Desc'
        }
      ]
    },
    {
      slug: 'ec_axial_fans',
      title: 'EC Axial fans',
      items: [
        {
          slug: 'slick_blades',
          title: 'Test',
          description: 'Desc'
        },
        {
          slug: 'slick_blades_1',
          title: 'Test',
          description: 'Desc'
        }
      ]
    },
    {
      slug: 'axial_fans_for_ventialtion',
      title: 'Axial fans for Ventilation',
      items: []
    },
    {
      slug: 'ec_axial_fans',
      title: 'EC Axial fans',
      items: []
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onItemSelected(slug: string): void {
    console.log(slug)

    console.log(_.filter(this.sections, { items: { slug: slug } }));
  }

  onFilterSelected(event): void {
    console.log(event);
  }
}
