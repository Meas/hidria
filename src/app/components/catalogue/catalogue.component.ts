import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  sections = [
    {
      slug: 'ac_axial_fans',
      title: 'AC Axial fans',
      items: [
        {
          slug: 'slick_blades',
          title: 'AC Axial fans',
          description: 'Sickled blades\n',
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
          title: 'AC Axial fans',
          description: 'Blades with composite material (PP/AP)es'
        },
        {
          slug: 'slick_blades_2',
          title: 'AC Axial fans',
          description: 'Paddle blades'
        },
        {
          slug: 'slick_blades_3',
          title: 'UL listed Axial Fans',
          description: ''
        }
      ]
    },
    {
      slug: 'ec_axial_fans',
      title: 'EC Axial fans',
      items: [
        {
          slug: 'slick_blades',
          title: 'H-ROOF fans',
          description: ''
        },
        {
          slug: 'slick_blades_1',
          title: 'H-TUBE fans',
          description: ''
        },
        {
          slug: 'slick_blades_1',
          title: 'SQUARE PLATE fans',
          description: ''
        }
      ]
    },
    {
      slug: 'axial_fans_for_ventialtion',
      title: 'Axial fans for Ventilation',
      items: [
        {
          slug: 'slick_blades',
          title: 'H-ROOF fans',
          description: ''
        },
        {
          slug: 'slick_blades_1',
          title: 'H-TUBE fans',
          description: ''
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
