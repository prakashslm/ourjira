import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { fadeInAnimation } from '../../core/animations/index';

import { AuthenticationService } from '../../services/index';
import { AlertService } from '../../shared/services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {
  unSubscription: { [index: string]: Subscription; } = {};

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute
    , private router: Router
    , private alertService: AlertService
    , private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(data => {
        this.alertService.success('login success', true);
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
