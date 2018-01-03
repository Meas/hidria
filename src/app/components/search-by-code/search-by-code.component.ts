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
    this.activatedRoute.params.subscribe((params: Params) => {
      const code = params['code'];
      console.log(code);
    });
  }

  inputChanged() {
    this.searchButtonDisabled = false;
  }

  searchSubmit() {
    this.searchButtonDisabled = true;
    const params = 'search-by-code?code=' + this.code;
    window.history.pushState('', '', params);
    this.searchByCodeService.search().subscribe((response: any) => {
      this.items = response;
    });
  }
}
