import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(
    private router: Router
    , private ngZone: NgZone
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.delay(() => { this.subject.next({ type: 'info', text: message }); }, 500);
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.delay(() => { this.subject.next({ type: 'warning', text: message }); }, 1000);
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.delay(() => { this.subject.next({ type: 'success', text: message }); }, 1500);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.delay(() => { this.subject.next({ type: 'danger', text: message }); }, 2000);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private delay(fn: Function, delay: number): void {
    if (!fn || delay < 0) {
      throw new Error(`No function or invalid delay provided.`);
    }
    this.ngZone.runOutsideAngular(() => {
      Observable
        .of(null)
        .delay(delay)
        .subscribe(() => this.ngZone.run(() => fn()));
    });
  }
}
