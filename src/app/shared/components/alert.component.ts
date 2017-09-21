import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services';

@Component({
  selector: 'alert',
  template: `<ng-template [ngIf]="message">
  <div class="alert alert-{{message.type}} alert-dismissible">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="message=undefined">
      <span aria-hidden="true">&times;</span>
    </button> {{message.text}}
  </div>
</ng-template>`
})
export class AlertComponent {
  message: any;

  constructor(
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}
