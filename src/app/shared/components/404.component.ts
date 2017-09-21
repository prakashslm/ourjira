import { Component } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'page-not-found',
  template: `Page Not Found`
})
export class PageNotFoundComponent {
  message: any;

  constructor(
    private alertService: AlertService
  ) {
  }
}
