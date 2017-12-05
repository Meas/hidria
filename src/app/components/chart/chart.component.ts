import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';

@Component({
  selector: 'chart-component',
  template: `
  	<div style="background: #fff !important">
	    <canvas [id]="canvasId" width="content-box" height="100"></canvas>
	  </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;

  constructor() {
  }

  ngOnInit() {}

  ngAfterViewInit() {
  	var canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
  	var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    var data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "f(x) = x",
            function: function(x) { return x },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x²",
            function: function(x) { return x*x },
            borderColor: "rgba(153, 102, 255, 1)",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x * log(x)",
            function: function(x) { return x*Math.log(x) },
            borderColor: "rgba(255, 206, 86, 1)",
            data: [],
            fill: false
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                  var fct = data.datasets[i].function,
                      x = data.labels[j],
                      y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });


    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            pointRadius: 0,
        }
    });



  	/*var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
          datasets: [{ 
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Africa",
              borderColor: "#3e95cd",
              fill: false
            }, { 
              data: [282,350,411,502,635,809,947,1402,3700,5267],
              label: "Asia",
              borderColor: "#8e5ea2",
              fill: false
            }, { 
              data: [168,170,178,190,203,276,408,547,675,734],
              label: "Europe",
              borderColor: "#3cba9f",
              fill: false
            }, { 
              data: [40,20,10,16,24,38,74,167,508,784],
              label: "Latin America",
              borderColor: "#e8c3b9",
              fill: false
            }, { 
              data: [6,3,2,2,7,26,82,172,312,433],
              label: "North America",
              borderColor: "#c45850",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'World population per region (in millions)'
          }
        }
      });*/
  }

}
