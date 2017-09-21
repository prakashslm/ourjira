import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { fadeInAnimation } from '../../../core/animations/index';

import { User } from '../../../models/index';
import { UserService } from '../../../services/index';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class CompanyListComponent implements OnInit {
  users: Array<User>;

  constructor(
    private route: ActivatedRoute
    , private router: Router
    , private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
    // this.userService.getById(56).subscribe(user => { console.log(user); });
  }
}
