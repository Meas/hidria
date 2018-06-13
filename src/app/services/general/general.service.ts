import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private service: MainService) { }

  getHistory(): Observable<any> {
    return this.service.get('history');
  }
}
