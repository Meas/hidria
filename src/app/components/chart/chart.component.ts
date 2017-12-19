import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" width="content-box" height="300"></canvas>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;
  @Input() chartData;

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
    console.log(this.chartData);
    const data = this.getGraphData();
    /*Chart.pluginService.register({
      beforeInit: function (chart) {
        const data = chart.config.data;
        for (let i = 0; i < data.datasets.length; i++) {
          for (let j = 0; j < data.labels.length; j++) {
            const fct = data.datasets[i].function,
                  x = data.labels[j],
                  y = fct(x);
            data.datasets[i].data.push(Math.round(y * 100) / 100);
          }
        }
      }
    });*/
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
        "borderColor": this.chartData.borderColor[i],
        "fill": true
      });
    }
    return data;
    /*return {
      labels: array,
      datasets: [{
        label: 'f(x) = x',
        function: function (x) {
          return x;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        data: [],
        fill: true
      },
        {
          label: 'f(x) = x²',
          function: function (x) {
            return x * x;
          },
          borderColor: 'rgba(153, 102, 255, 1)',
          data: [],
          fill: true
        },
      ]
    };*/
  }

  getOptions() {
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
              /*userCallback: function(label, index, labels) {
               if (label % 20 == 0) {
               return label;
               }
               },*/
              maxTicksLimit: 10,
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              /*userCallback: function(label, index, labels) {
               if (label % 2 === 0) {
               return label;
               }
               },*/
              maxRotation: 0,
              maxTicksLimit: 5,
              /*beginAtZero: true*/
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
          /*console.log(activeElems[0])*/
          const x = this.data.labels[activeElems[0]._index];
          const y = this.data.datasets[activeElems[0]._datasetIndex].data[activeElems[0]._index];
          console.log('x: ' + x + ' y:' + y);
        },
      };
    }
  }

}
