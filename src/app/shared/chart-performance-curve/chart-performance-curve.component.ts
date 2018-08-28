import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import Chart from 'chart.js';
import {ChartServiceService} from '../../services/chart-service/chart-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chart-performance-curve-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" height="180"></canvas>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./chart-performance-curve.component.css']
})
export class ChartPerformanceCurveComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;
  chartData;
  myBarChart;
  @Input() set cd(data) {
    this.chartData = data;
    setTimeout(() => {
      this.generateGraph();
    }, 300);
  }
  @Input() type;

  constructor(private chartService: ChartServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.generateGraph();
  }

  generateGraph() {
    if (this.myBarChart) {
      this.myBarChart.destroy();
    }
    const canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const data = this.getGraphData();
    const options = this.getOptions();

    this.myBarChart = new Chart(ctx, {
      type: this.type,
      data: data,
      options: options,
    });
  }

  getGraphData() {
    const data: any = {};
    data.labels = this.chartData.xpoints;
    data.datasets = [];
    this.chartData.xpoints[this.chartData.xpoints.length - 1] = 'Total';
    for (let i = 0; i < this.chartData.ypoints.length; i++) {
      data.datasets.push({
        'label': this.chartData.labels[i],
        'data': this.chartData.ypoints[i],
        'yValue': this.chartData.ypoints[i],
        'xValue': this.chartData.xpoints,
        'yLabel': this.chartData.yLabel,
        'xUnit': this.chartData.xUnit,
        'yUnit': this.chartData.yUnit,
        'xLabel': this.chartData.xLabel,
        'backgroundColor': this.chartData.borderColor[i],
        'fill': true
      });
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
        animation: {
          duration: 1,
          onComplete: function () {
            const chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          animationDuration: 0
        },
        title: {
          display: true,
          text: this.chartData.name
        }
      };
    }
  }

}
