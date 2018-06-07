import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() visible = false;
  @Output() hide: EventEmitter<boolean> = new EventEmitter();

  onConfirm(cb) {
    cb(true);
  }
}
