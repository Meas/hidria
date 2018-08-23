import { Component, EventEmitter, Input, Output } from '@angular/core';
import Chart from 'chart.js';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-comparison-graph-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./comparison-graph.component.css']
})
export class ComparisonGraphComponent {

  chartData;
  areaChart;

  @Input() canvasId: string;
  @Input() secondLabel = 'B';
  @Input() secondLine = true;
  @Input() showYColors = false;
  @Input() interactive: boolean;
  @Input() type = 'sound';
  @Input() set chartSetData(data) {
    if (data) {
      this.chartData = data;
      setTimeout(() => {
        this.generateGraph();
      }, 300);
    }
  }

  @Output() points: EventEmitter<Array<string>> = new EventEmitter();

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
    this.chartData.ypoints = this.chartData.ypoints.filter(point => !isEmpty(point))
    if (this.chartData.xpoints[0] !== 0) {
      this.chartData.xpoints.unshift(0);
    }

    data.labels = this.chartData.xpoints.map(point => isEmpty(point) ? point : null);
    data.datasets = [];
    for (let i = 0; i < this.chartData.ypoints.length; i++) {
      const dataValue = this.chartData.ypoints[i];
      console.log('VAL', dataValue)
      data.datasets.push({
        label: this.chartData.labels[i],
        data: dataValue,
        yValue: dataValue,
        xValue: this.chartData.xpoints,
        xLabel: this.chartData.xLabel,
        xUnit: this.chartData.xUnit,
        yLabel: this.chartData.yLabel,
        yUnit: this.chartData.yUnit,
        borderColor: this.chartData.borderColor[i],
        fill: false
      });
    }

    return data;
  }

  getOptions() {
    const self = this;
    {
      return {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0
          },
          line: {}
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              maxRotation: 0,
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
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function(tooltipItem, data) {
              return [
                `Model: ${data.datasets[tooltipItem.datasetIndex].label}`,
                `${data.datasets[tooltipItem.datasetIndex].xLabel} ${data.datasets[tooltipItem.datasetIndex].xUnit}: ${data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index]}`,
                `${data.datasets[tooltipItem.datasetIndex].yLabel} ${data.datasets[tooltipItem.datasetIndex].yUnit}: ${data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index]}`
              ];
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      };
    }
  }

}
