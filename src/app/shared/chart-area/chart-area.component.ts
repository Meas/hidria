import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import Chart from 'chart.js';

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
    data.labels = this.chartData.xpoints;
    data.datasets = [];
    if (this.type === 'sound') {
      let k = 0;
      for (let i = 0; i < this.chartData.ypoints.length; i++) {
        const dataValue = this.chartData.ypoints[i];
        if (this.chartData.ypoints[i].length !== 0) {
          console.log(this.chartData, i);
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
            'yAxisID': this.secondLine ? i > 0 ? 'B' : 'A' : 'A',
            'percentageLabl': this.chartData.percentage,
            'borderColor': this.chartData.borderColor[k],
            'fill': false
          });
          k++;
        }
      }
    } else {
      for (let i = 0; i < this.chartData.ypoints.length; i++) {
        for (let j = 100; j > 1; j--) {
          const borderColor = j === 100 ? this.chartData.borderColor[i] : j % 10 === 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)';
          const fill = j === 100;
          const dataValue = this.chartData.ypoints[i].map(x => Math.round(x * j / 100));
          data.datasets.push({
            'label': this.chartData.labels[i],
            'data': dataValue,
            'yValue': dataValue,
            'xValue': this.chartData.xpoints,
            'yLabel': this.chartData.yLabel,
            'xUnit': this.chartData.xUnit,
            'yUnit': this.chartData.yUnit,
            'xLabel': this.chartData.xLabel,
            'percentageLabel': this.chartData.percentage,
            'percentage': j,
            'borderColor': borderColor,
            'fill': fill
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
              display: this.secondLine,
              position: 'right',
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                max: this.maxRight,
                fontColor: this.showYColors ? this.chartData.borderColor[1] : undefined
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
                `label: ${data.datasets[tooltipItem.datasetIndex].label}`,
                `${data.datasets[tooltipItem.datasetIndex].xLabel} ${data.datasets[tooltipItem.datasetIndex].xUnit} ${data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index]}`,
                `${data.datasets[tooltipItem.datasetIndex].yLabel} ${data.datasets[tooltipItem.datasetIndex].yUnit} ${data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index]}`
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
