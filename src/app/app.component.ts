import { Component } from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  measure = 'm';
  loggedIn = false;

  constructor(private authService: AuthService) {
    this.loggedIn = authService.isLoggedIn();
  }

  onChangeMetrics(event): void {
    this.measure = event;
  }
}
