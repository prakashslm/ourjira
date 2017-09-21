'use strict';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
// https://manuel-rauber.com/2016/01/05/angular-2-spinner-component/
// https://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
export class SpinnerComponent implements OnInit, OnDestroy {
  private currentTimeout: any;
  private isDelayedRunning: boolean = false;

  @Input()
  public delay: number = 300;

  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
      return;
    }

    if (this.currentTimeout) {
      return;
    }
    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    }, this.delay);
  }

  constructor() {
  }

  ngOnInit() {
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }
}
