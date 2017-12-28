import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
/*import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';*/
import Chart from 'chart.js';

@Component({
  selector: 'app-chart-area-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" width="content-box" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./chart-area.component.css']
})
export class ChartAreaComponent implements OnInit, AfterViewInit {
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

    const areaChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

  getGraphData() {
    const data: any = {};
    data.labels = this.chartData.xPoints;
    data.datasets = [];
    for (let i = 0; i < this.chartData.yPoints.length; i++) {
      for (let j = 100; j > 1; j--) {
        const borderColor = j === 100 ? this.chartData.borderColor[i] : 'rgba(0,0,0,0)';
        const fill = j === 100;
        const dataValue = this.chartData.yPoints[i].map(x => Math.round(x * j) / 100);
        data.datasets.push({
          'label': this.chartData.labels[i],
          'data': dataValue,
          'yValue': dataValue,
          'xValue': this.chartData.xPoints,
          'yLabel': this.chartData.yLabel,
          'xLabel': this.chartData.xLabel,
          'percentageLabel': this.chartData.percentage,
          'percentage': j,
          'borderColor': borderColor,
          'fill': fill
        });
      }
    }
    return data;
  }

  getOptions() {
    const self = this;
    {
      return {
        legend: {
          display: false
        },
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
            },
            scaleLabel: {
              display: true,
              labelString: self.chartData.yUnit
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              maxRotation: 0,
              maxTicksLimit: 5,
            },
            scaleLabel: {
              display: true,
              labelString: self.chartData.xUnit
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
          custom: function(tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function(tooltipItem, data) {
              return [
                data.datasets[tooltipItem.datasetIndex].percentageLabel + ': ' + data.datasets[tooltipItem.datasetIndex].percentage + '%',
                data.datasets[tooltipItem.datasetIndex].xLabel + ': ' + data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index],
                data.datasets[tooltipItem.datasetIndex].yLabel + ': ' + data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index],
              ];
            },
            title: function(tooltipItem, data) {
              return;
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        onClick: function (clickEvt, activeElements) {
          const x = this.data.labels[activeElements[0]._index];
          const y = this.data.datasets[activeElements[0]._datasetIndex].data[activeElements[0]._index];
          const graphValue = this.data.datasets[activeElements[0]._datasetIndex].graphValue;
          if (self.interactive) {
            self.points.emit([x, y, graphValue]);
          }
        },
      };
    }
  }

}
