import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-fan-details',
  templateUrl: './fan-details.component.html',
  styleUrls: ['./nv.d3.min.css', './fan-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FanDetailsComponent implements OnInit {

  options;
  data;

  ngOnInit() {
    this.options = {
      chart: {
        type: 'stackedAreaChart',
        backgroundColor: '#F5DEB3',
        height: 450,
        width: 800,
        fill: '#F5DEB3',
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        x: function (d) {
          return d[0];
        },
        y: function (d) {
          return d[1];
        },
        useVoronoi: false,
        clipEdge: true,
        duration: 100,
        useInteractiveGuideline: true,
        xAxis: {
          showMaxMin: false,
          tickFormat: function (d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        yAxis: {
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };
    this.data = [];
  }
}
