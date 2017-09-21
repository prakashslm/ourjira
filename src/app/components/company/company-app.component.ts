import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-company',
  templateUrl: './company-app.component.html'
})
export class CompanyAppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
    , private router: Router
  ) {
  }

  ngOnInit() {
  }
}
