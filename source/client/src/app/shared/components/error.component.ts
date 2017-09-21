import { Component } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'error',
  template: `Error Occurred`
})
export class ErrorComponent {
  message: any;

  constructor(
    private alertService: AlertService
  ) {
  }
}
