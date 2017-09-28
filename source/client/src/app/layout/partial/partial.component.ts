import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.scss'],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': 'true' }
})
export class PartialComponent implements OnDestroy, OnInit {
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
