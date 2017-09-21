import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { slideInOutAnimation } from '../../../core/animations/index';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  // animations: [slideInOutAnimation],
  // host: { '[@slideInOutAnimation]': '' }
})
export class CompanyAddComponent implements OnInit {
  company: any = {};

  constructor(
    private route: ActivatedRoute
    , private router: Router
  ) {
  }

  ngOnInit() {
  }
}
