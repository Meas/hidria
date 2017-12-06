import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-accordion-input',
  templateUrl: './accordion-input.component.html',
  styleUrls: ['./accordion-input.component.scss']
})
export class AccordionInputComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const acc: HTMLButtonElement = <HTMLButtonElement>document.getElementById('accordion');

    acc.onclick = function(){
      this.classList.toggle('active');
      const panel = document.getElementById('panel');
      if (panel.style.height === '200px') {
        panel.style.height = '0';
      } else {
        panel.style.height = '200px';
      }
    }
  }

}
