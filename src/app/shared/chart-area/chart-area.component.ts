import { Component, EventEmitter, Input, Output } from '@angular/core';
import Chart from 'chart.js';
import { isEmpty, cloneDeep } from 'lodash';

@Component({
  selector: 'app-chart-area-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./chart-area.component.css']
})
export class ChartAreaComponent {

  chartData;
  areaChart;
  maxRight = 10;

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

    data.labels = this.chartData.xpoints.map(point => isEmpty(point) ? point : null);
    data.datasets = [];
    if (this.chartData.fanType !== 'EC') {
      for (let i = 0; i < this.chartData.ypoints.length; i++) {
        const dataValue = cloneDeep(this.chartData.ypoints[i]);
        if (dataValue.length !== 0) {
          this.maxRight = Math.ceil(Math.max.apply(Math, this.chartData.ypoints[i]));
          data.datasets.push({
            mytype: this.chartData.type,
            label: this.chartData.labels[i],
            data: dataValue.map((y, index) => ({
              x: this.chartData.xpoints[index],
              y: y
            })),
            yValue: dataValue,
            xValue: this.chartData.xpoints,
            xLabel: this.chartData.xLabel,
            xUnit: this.chartData.xUnit,
            yLabel: this.chartData.yLabel,
            yUnit: this.chartData.yUnit,
            yAxisID: i < 2 ? 'A' : 'B',
            percentageLabel: this.chartData.percentage,
            borderColor: this.chartData.borderColor[i],
            fill: false
          });
        }
      }
    } else {
      for (let i = 0; i < this.chartData.ypoints.length; i++) {
        for (let j = 100; j > 1; j--) {
          const borderColor = j === 100 ? this.chartData.borderColor[i] : j % 10 === 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)';
          const fill = j === 100;
          const dataValue = i < 1 && this.chartData.type === 'static_pressure' ? this.chartData.ypoints[i].map(x => x * j / 100) : this.chartData.ypoints[i];
          data.datasets.push({
            mytype: this.chartData.type,
            label: this.chartData.labels[i],
            data: dataValue.map((y, index) => ({
              x: this.chartData.xpoints[index],
              y: y
            })),
            yValue: dataValue,
            xValue: this.chartData.xpoints,
            yLabel: this.chartData.yLabel,
            xUnit: this.chartData.xUnit,
            yUnit: this.chartData.yUnit,
            yAxisID: i < 2 ? 'A' : 'B',
            xLabel: this.chartData.xLabel,
            percentageLabel: this.chartData.percentage,
            percentage: j,
            borderColor: borderColor,
            // fill: fill && this.chartData.type === 'static_pressure'
            fill: false
          });
        }
      }
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
          yAxes: [{
            id: 'A',
            position: 'left',
            ticks: {
              fontColor: this.showYColors ? this.chartData.borderColor[0] : undefined
            },
            scaleLabel: {
              display: true,
              labelString: self.chartData.yUnit
            }
          }, {
              id: 'B',
              display: this.secondLine && this.secondLabel,
              position: 'right',
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                // max: this.maxRight,
                fontColor: this.showYColors ? this.chartData.borderColor[1] : undefined
              },
              scaleLabel: {
                display: true,
                labelString: this.secondLabel
              }
            }
          ],
          xAxes: [{
            type: 'linear',
            ticks: {
              beginAtZero: true,
              maxRotation: 0,
              // maxTicksLimit: 5,
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
              // console.log(tooltipItem, data)
              return [
                `Model: ${data.datasets[tooltipItem.datasetIndex].label}`,
                `${data.datasets[tooltipItem.datasetIndex].xLabel} ${data.datasets[tooltipItem.datasetIndex].xUnit}: ${data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index]}`,
                `${data.datasets[tooltipItem.datasetIndex].yLabel} ${data.datasets[tooltipItem.datasetIndex].yUnit}: ${data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index]}`
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
          console.log()
          const x = this.data.datasets[activeElements[0]._datasetIndex].mytype === 'static_pressure' ?
            this.data.datasets[activeElements[0]._datasetIndex].data[activeElements[0]._index].x :
            undefined;
          const y = this.data.datasets[activeElements[0]._datasetIndex].data[activeElements[0]._index].y;
          if (self.interactive) {
            self.points.emit([x ? (Math.round(x * 100) / 100).toString() : undefined, Number(Math.round(y * 100) / 100).toString()]);
          }
        },
      };
    }
  }

}
