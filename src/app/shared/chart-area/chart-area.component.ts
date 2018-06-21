import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
/*import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';*/
import Chart from 'chart.js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart-area-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./chart-area.component.css']
})
export class ChartAreaComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;
  @Input() secondLabel = 'B';
  chartData;
  areaChart;
  maxRight = 10;
  @Input() set chartSetData(data) {
    if (data) {
      this.chartData = data;
      setTimeout(() => {
        this.generateGraph();
      }, 300);
    }
  }
  @Input() interactive: boolean;
  @Output() points: EventEmitter<Array<string>> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  generateGraph() {
    if (this.areaChart) {
      this.areaChart.destroy();
    }
    const canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const data = this.getGraphData();
    const options = this.getOptions();

    this.areaChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

  getGraphData() {
    const data: any = {};
    data.labels = this.chartData.xpoints;
    data.datasets = [];
    for (let i = 0; i < this.chartData.ypoints.length; i++) {
      const dataValue = this.chartData.ypoints[i];
      if (this.chartData.ypoints[i].length !== 0) {
        this.maxRight = Math.ceil(Math.max.apply(Math, this.chartData.ypoints[i]));
        data.datasets.push({
          'label': this.chartData.labels[i],
          'data': dataValue,
          'yValue': dataValue,
          'xValue': this.chartData.xpoints,
          'xLabel': this.chartData.xLabel,
          'xUnit': this.chartData.xUnit,
          'yLabel': this.chartData.yLabel,
          'yUnit': this.chartData.yUnit,
          'yAxisID': i > 0 ? 'B' : 'A',
          'percentageLabel': this.chartData.percentage,
          'borderColor': this.chartData.borderColor[i],
          'fill': false
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
            id: 'A',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: self.chartData.yUnit
            }
          }, {
              id: 'B',
              position: 'right',
              ticks: {
                max: this.maxRight
              },
              scaleLabel: {
                display: true,
                labelString: this.secondLabel
              }
            }
          ],
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
            if (!tooltip) { return; }
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function(tooltipItem, data) {
              return [
                data.datasets[tooltipItem.datasetIndex].xLabel + ' ' + data.datasets[tooltipItem.datasetIndex].xUnit
                + ': ' + data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index],
                data.datasets[tooltipItem.datasetIndex].yLabel + ' ' + data.datasets[tooltipItem.datasetIndex].yUnit
                + ': ' + data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index],
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
          if (self.interactive) {
            self.points.emit([(Math.round(x * 100) / 100).toString(), Number(Math.round(y * 100) / 100).toString()]);
          }
        },
      };
    }
  }

}
