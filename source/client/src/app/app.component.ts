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

// import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';
import { animate, state, style, trigger, transition, query } from '@angular/animations';

import * as $ from 'jquery';
// import _ from 'lodash';
import * as _ from 'lodash';
import * as moment from 'moment';


import { slideLeft, slideRight, transLeft, transRight, ani1 } from './core/animations/index';
import { AlertService } from '@shared/services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  host: {
    '[@routerAnimations]': 'true'
  },
  animations: [
    trigger('routerAnimations', [
      // transition('* => *', animate('1s 0s')),
      transition('home => *', [
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':leave', [animate(1000, style({ transform: 'translateX(100%)' }))]),
        query(':enter', animate(500))
      ])

      // transition('login => home', slideLeft),
      // transition('home => login', slideRight),
      // transition('home => company', slideRight),
      // transition('home => todo', transLeft),
      // transition('todo => login', transRight),
      // transition('todo => home', transRight),
      // transition('todo => company', transLeft),
      // transition('company => home', slideLeft),
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('logout') logout: TemplateRef<any>;
  @ViewChild('login') login: TemplateRef<any>;
  @ViewChild('spinnerElement') spinnerElement: ElementRef;
  title = 'welcome to our application';
  // isValid = true;
  isRequesting = false;
  currentUser: any;

  menuState: string = 'out';

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
        // this.isRequesting = true;
        this.renderer.setElementStyle(this.spinnerElement.nativeElement, 'opacity', '1');
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
      this.renderer.setElementStyle(this.spinnerElement.nativeElement, 'opacity', '0');
    })
  }

  loadTemplate(): any {
    if (this.currentUser) {
      return this.logout;
    } else {
      return this.login;
    }
  }

  // prepareRouteTransition(outlet) {
  //   let routeData: any;
  //   try {
  //     routeData = outlet['_activatedRoute'].snapshot.routeConfig['animation'];
  //   } catch (e) {
  //     return '';
  //   }
  //   return routeData.value;
  // }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};

    return animation['value'] || 'init';
  }

  toggleMenu(): void {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
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

  public delay1(fn: Function, delay: number): void {
    if (!fn || delay < 0) {
      throw new Error(`No function or invalid delay provided.`);
    }
    Observable.create((observer) => {
      let timeout = null;
      this.ngZone.runOutsideAngular(() => {
        timeout = setTimeout(() => {
          observer.next(null);
          observer.complete();

          return () => {
            if (timeout) {
              clearTimeout(timeout);
            }
          };
        }, delay);
      });
    });
  }

  public poll(fn: Function, pollInterval: number): void {
    if (!fn || pollInterval < 0) {
      throw new Error(`No function or invalid pollInterval provided.`);
    }
    this.ngZone.runOutsideAngular(() => {
      const unsub = Observable
        .timer(0, pollInterval)
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
