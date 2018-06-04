import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-my-projects-model-list',
  templateUrl: './my-projects-model-list.component.html',
  styleUrls: ['./my-projects-model-list.component.scss']
})
export class MyProjectsModelListComponent implements OnInit {

  @Input() modelList;
  @Output() removeModel: EventEmitter<any> = new EventEmitter;
  @Output() saveNoteEmitter: EventEmitter<any> = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }

  deleteItem(id) {
    const self = this;
  }
  saveNote(note, modelId) {
    note.classList.add('disabled');
    this.saveNoteEmitter.emit({
      id: modelId,
      note: note.value
    });
  }
  editNote(note) {
    note.classList.remove('disabled');
  }
}
