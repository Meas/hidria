import { Component, OnInit } from '@angular/core';
import { SearchByCodeService } from '../../services/search-by-code/search-by-code.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-by-code',
  templateUrl: './search-by-code.component.html',
  styleUrls: ['./search-by-code.component.scss']
})
export class SearchByCodeComponent implements OnInit {

  searchButtonDisabled: Boolean = true;
  code: String = '';
  items: any = [];

  constructor(private searchByCodeService: SearchByCodeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const paramCode = params['code'];
      if (paramCode) {
        this.code = paramCode;
        this.searchSubmit();
      }
    });
  }

  inputChanged() {
    this.searchButtonDisabled = false;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13 && !this.searchButtonDisabled) {
      this.searchSubmit();
    }
  }

  searchSubmit() {
    this.searchButtonDisabled = true;
    const params = 'search-by-code?code=' + this.code;
    window.history.replaceState('', '', params);
    this.searchByCodeService.search('code').subscribe((response: any) => {
      this.items = response;
    });
  }
}
