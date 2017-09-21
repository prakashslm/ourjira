import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-layout1',
  templateUrl: './side-layout.component.html',
  styleUrls: ['./side-layout.component.scss'],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': 'true' }
})
export class Layout1Component implements OnDestroy, OnInit {
  unSubscription: { [index: string]: Subscription; } = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  unsubscribe(key: string): void {
    if (this.unSubscription[key]) {
      this.unSubscription[key].unsubscribe();
    }
  }

  ngOnDestroy(): void {
    for (const key in this.unSubscription) {
      this.unsubscribe(key);
    }
  }
}
