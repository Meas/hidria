import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-display-options',
  templateUrl: './display-options.component.html',
  styleUrls: ['./display-options.component.scss']
})
export class DisplayOptionsComponent {

  @Input() selectedTab;
  @Input() downloads;
  @Output() tab: EventEmitter<string> = new EventEmitter(true);

  constructor(private zone: NgZone,
              private cd: ChangeDetectorRef) { }

  goToLink(link) {
    window.open(link, '_blank');
  }

}
