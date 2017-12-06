import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';

@Component({
  selector: 'chart-component',
  template: `
  	<div style="background: #fff !important">
    .I. .I.
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
  	this.generateGraph();
    /*var helpers = myBarChart.helpers;

     helpers.bindEvents(myBarChart, ["mousemove", "touchstart", "touchmove", "mouseout"], function(evt){
         if ((evt.type === 'mouseout')) {
             console.log("mouse out");
             return;
         }
         var activeSegments = myBarChart.getSegmentsAtEvent(evt);
         if (!activeSegments.length) return;

         console.log("mousemove", activeSegments[0])
     });*/
    /*document.getElementById(this.canvasId).onclick = function(evt){
      console.log(myBarChart.getElementsAtEvent(evt));
        var activePoints = myBarChart.getElementsAtEvent(evt);
        var firstPoint = activePoints[1];
        var label = myBarChart.data.labels[firstPoint._index];
        var value = myBarChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        alert(label + ": " + value);
    };*/
  }

  generateGraph() {
      var canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
      var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
     
      var data = this.getGraphData();
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
      var options = this.getOptions();
      
      var myBarChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options,
      });
  }

  getGraphData() {
    var array = [];
    for(var i = 0; i <= 1000; i++)
      array.push(i/100);

    return {
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
  }
  getOptions() {
    {
        return  {
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
             mode: 'nearest',
             intersect: false,
           },
          hover: {
            mode: 'nearest',
            intersect: false
           },
           onClick: function(clickEvt,activeElems) {
             /*console.log(activeElems[0])*/
             var x = this.data.labels[activeElems[0]._index];
             var y = this.data.datasets[activeElems[0]._datasetIndex].data[activeElems[0]._index];
             console.log('x: '+x+' y:'+y);
           },
      }
    }
  }

}
