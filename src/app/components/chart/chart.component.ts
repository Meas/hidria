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
   
    var array = [];
    for(var i = 0; i <= 10; i+=0.01)
      array.push(Math.round(i * 100)/100);
    console.log(array);
    var data = {
      labels: array,
        datasets: [{
            label: "f(x) = x",
            function: function(x) { return x },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: true
        },
        {
            label: "f(x) = x²",
            function: function(x) { return x*x },
            borderColor: "rgba(153, 102, 255, 1)",
            data: [],
            fill: true
        },
        ]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                  var fct = data.datasets[i].function,
                      x = data.labels[j],
                      y = fct(x);
                    data.datasets[i].data.push(Math.round(y * 100)/100);
                }
            }
        }
    });

    /*data.labels=[0,2,4,6,8,10];*/
    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            elements: {
                point: {
                    radius: 0
                },
                line: {
                  
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        /*userCallback: function(label, index, labels) {
                             if (label % 20 == 0) {
                                 return label;
                             }
                         },*/
                         maxTicksLimit: 5,
                    }
                }],
                xAxes: [{
                    ticks: {
                      beginAtZero:true,
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
               mode: 'index',
               intersect: false,
             },
            hover: {
              mode: 'nearest',
              intersect: false
             },
        }
    });
    document.getElementById(this.canvasId).onclick = function(evt){
      console.log(myBarChart.getElementsAtEvent(evt));
        var activePoints = myBarChart.getElementsAtEvent(evt);
        var firstPoint = activePoints[1];
        var label = myBarChart.data.labels[firstPoint._index];
        var value = myBarChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        alert(label + ": " + value);
    };
  }

}
