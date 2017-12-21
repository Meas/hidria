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
        "borderColor": this.chartData.borderColor[i],
        "fill": true
      });
    }
    return data;
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
          const x = this.data.labels[activeElems[0]._index];
          const y = this.data.datasets[activeElems[0]._datasetIndex].data[activeElems[0]._index];
        },
      };
    }
  }

}
