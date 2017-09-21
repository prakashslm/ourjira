import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-partial-collapse',
  templateUrl: './partial-collapse.component.html',
  styleUrls: ['./partial-collapse.component.css'],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': 'true' }
})
export class PartialCollapseComponent implements OnDestroy, OnInit {
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
