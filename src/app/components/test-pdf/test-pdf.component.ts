import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';

@Component({
  selector: 'test-pdf',
  template: `
    <div id="toDownload" style="background: #fff !important">
      <div style="background: blue; color: white; font-size: 24px">
        <span>test</span>
        <span style="float:right">test</span>
      </div>
      <div style="background: red; color: white; font-size: 24px">
        <span>test</span>
        <span style="float:right">test</span>
      </div>
      <chart-component [canvasId]="'canvas1'"></chart-component>
    </div>
    <button (click)="downloadPdf()">DOWNLOAD</button>
  `,
  styleUrls: ['./test-pdf.component.css']
})
export class TestPdfComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  downloadPdf() {
    const toDownload = document.getElementById('toDownload');
    const doc = new jsPDF('p', 'px', 'a4');
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;

    const widthDiv = toDownload.offsetWidth;
    let heightDiv = toDownload.offsetHeight;

    heightDiv = (width - 20) * (heightDiv / widthDiv);

    html2canvas(toDownload, {
      background: '#FFFFFF',
      format: 'PNG',
      onrendered: function (canvas) {
        /*toDownload.appendChild(canvas);*/
        doc.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, width - 20,
          heightDiv);
        /*document.getElementById('pic').src = canvas.toDataURL("image/png", 1.0);*/
        doc.save('lalala.pdf');
      }
    });
    /*.then(function(canvas) {*/
    /*toDownload.appendChild(canvas);*/
    /*doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPG", 10, 10, width-20,
     heightDiv);*/
    /*document.getElementById('pic').src('src', canvas.toDataURL("image/jpeg", 1.0))*/
    /* doc.save('lalala.pdf');*/
    /*canvas.toDataURL("image/jpeg", 1.0);*/
    /*});*/
  }

}
