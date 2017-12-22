import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" width="content-box" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;
  @Input() chartData;
  @Input() interactive: boolean;
  @Output() points: EventEmitter<Array<string>> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.generateGraph();
  }

  generateGraph() {
    const canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const data = this.getGraphData();
    const options = this.getOptions();

    const myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

  getGraphData() {
    var data: any = {};
    data.labels = this.chartData.xPoints;
    data.datasets = [];
    for(let i=0; i< this.chartData.yPoints.length; i++) {
      data.datasets.push({
        "label": this.chartData.labels[i],
        "data": this.chartData.yPoints[i],
        "graphValue": this.chartData.graphValue[i],
        "borderColor": this.chartData.borderColor[i],
        "fill": true
      });
    }
    return data;
  }

  getOptions() {
    var self=this;
    {
      return {
        elements: {
          point: {
            radius: 0
          },
          line: {}
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10,
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              maxRotation: 0,
              maxTicksLimit: 5,
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        onClick: function (clickEvt, activeElems) {
          let x = this.data.labels[activeElems[0]._index];
          let y = this.data.datasets[activeElems[0]._datasetIndex].data[activeElems[0]._index];
          let graphValue = this.data.datasets[activeElems[0]._datasetIndex].graphValue;
          if(self.interactive) {
            self.points.emit([x,y,graphValue])
          }
        },
      };
    }
  }

}
