import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  permissions = {
    admin: false,
    comparison: false
  };
  code = '';
  @Input() isLoggedIn = false;
  @Input() isOpenedSearchByCode;

  @Output('toggleSearchByCode') toggleSearchByCode: EventEmitter<{ status: boolean, value: string }> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.permissions.subscribe((data) => {
      console.log(data);
      this.permissions = data;
    });
  }

  onSearchByCodeClicked(data = false) {
    this.toggleSearchByCode.emit({ status: data, value: this.code });
    this.code = '';
  }
}
