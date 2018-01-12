import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  visible = true;

  constructor() { }

  ngOnInit() {
  }

  hideModal() {
    this.visible = false;
  }

  showModal() {
    this.visible = true;
  }
}
