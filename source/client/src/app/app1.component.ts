import { AfterViewInit, Component, ElementRef, NgZone, OnInit, OnDestroy, Renderer, TemplateRef, ViewChild } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { Observable } from "rxjs";

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

import { AlertService } from '@shared/services/index';

export type ScreenWidth = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app1-root',
  // template: '<app-layout1></app-layout1>'
  template: `<app-partial>
  <div class="side-bar-content"><li><a href="">from app comp</a></li></div>
  <div class="main-content">from app comp</div>
  // <router-outlet></router-outlet>
  </app-partial>`
})
export class App1Component implements OnInit, AfterViewInit, OnDestroy {
  title = 'welcome to our application';
  // isValid = true;
  isRequesting = false;
  currentUser: any;

  constructor(
    private element: ElementRef
    , private ngZone: NgZone
    , private router: Router
    , private renderer: Renderer
    , private alertService: AlertService
  ) {
    this.title = _.capitalize(this.title);
    this.delay(() => { this.alertService.info('Welcome to Application', false); }, 2000);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(moment.now(), moment().format('dddd')
      , moment().startOf('day').fromNow(), 'jquery trim', $.trim('  hello  '));

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
      })
    }
    if (event instanceof NavigationEnd) {
      this.delay(() => { this._hideSpinner(); }, 2000);
    }
    if (event instanceof NavigationCancel) {
      this.delay(() => { this._hideSpinner(); }, 2000);
    }
    if (event instanceof NavigationError) {
      this.delay(() => { this._hideSpinner(); }, 2000);
    }
  }

  private _hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.isRequesting = false;
    })
  }

  public delay(fn: Function, delay: number): void {
    if (!fn || delay < 0) {
      throw new Error(`No function or invalid delay provided.`);
    }
    this.ngZone.runOutsideAngular(() => {
      const unsub = Observable
        .of(null)
        .delay(delay)
        .subscribe(() => {
          this.ngZone.run(() => {
            fn();
            unsub.unsubscribe();
          });
        });
    });
  }

  isHeaderShown(): boolean {
    return !(this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in" || this.router.url === "/admin/failure");
  }

  isFooterShown(): boolean {
    // return !(this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in" || this.router.url === "/admin/failure");
    return !(this.router.url.indexOf('/login') > -1 || this.router.url === "/projects");
  }

  ngOnDestroy(): void {
  }
}
