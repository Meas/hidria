import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'test-pdf',
  template: `
  	<div id="toDownload">
	    <div style="background: blue; color: white; font-size: 24px">
	    	<span>test</span>
	    	<span style="float:right">test</span>
	    </div>
	    <div style="background: red; color: white; font-size: 24px">
	    	<span>test</span>
	    	<span style="float:right">test</span>
	    </div>
	</div>
	<button (click)="downloadPdf()">DOWNLOAD</button>
  `,
  styleUrls: ['./test-pdf.component.css']
})
export class TestPdfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  downloadPdf() {
  	let toDownload = document.getElementById('toDownload');
  	let doc = new jsPDF("p", "px", "a4" );
  	var width = doc.internal.pageSize.width;    
	var height = doc.internal.pageSize.height;

	var widthDiv = toDownload.offsetWidth; 
	var heightDiv = toDownload.offsetHeight; 

	heightDiv= (width-20)*(heightDiv/widthDiv);

  	html2canvas(toDownload).then(function(canvas) {
  	    /*toDownload.appendChild(canvas);*/
  	    console.log(toDownload.offsetWidth);
  	    doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPG", 10, 10, width-20,
  	     heightDiv);
  	    /*document.getElementById('pic').src('src', canvas.toDataURL("image/jpeg", 1.0))*/
  	    doc.save('lalala.pdf');
  	    /*canvas.toDataURL("image/jpeg", 1.0);*/
  	});
  }

}
