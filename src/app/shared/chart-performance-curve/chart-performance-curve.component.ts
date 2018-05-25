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
  @Input() chartData;
  @Input() type;

  constructor(private chartService: ChartServiceService, private router: Router) {
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
      type: this.type,
      data: data,
      options: options,
    });
  }

  getGraphData() {
    const data: any = {};
    data.labels = this.chartData.xpoints;
    data.datasets = [];
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
        'borderColor': this.chartData.borderColor[i],
        'fill': false
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
                data.datasets[tooltipItem.datasetIndex].label,
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
        title: {
          display: true,
          text: this.chartData.name
        }
      };
    }
  }

}
