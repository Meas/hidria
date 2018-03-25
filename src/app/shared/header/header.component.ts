import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() measure;
  @Output() changeMetricsClick: EventEmitter<string> = new EventEmitter();
  @Output() changeLanguage: EventEmitter<string> = new EventEmitter();
  @Input() selectedLanguage;

  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
