import { Component, AfterViewChecked, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { fadeInAnimation } from '../../core/animations/index';

import { User } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': 'true' }
})
export class HomeComponent implements OnDestroy, OnInit, AfterViewChecked {
  unSubscription: { [index: string]: Subscription; } = {};

  currentUser: User;
  users: User[] = [];
  selectedUser: User;
  tempForm: NgForm;

  graphData = [10, 20, 30, 40, 60];
  tdata = [10, 20, 30, 40, 60];

  lastnameSearch: string = 'vivekanandan';

  @ViewChild('ngForm') ngForm: NgForm;
  @ViewChild('displayTmpl') displayTmpl: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.loadAllUsers();

    const t = setTimeout(() => {
      this.tdata = [10, 20, 90, 40, 60, 80];
      clearTimeout(t);
    }, 2000);
  }

  ngAfterViewChecked(): void {
    if (this.tempForm !== this.ngForm) {
      this.tempForm = this.ngForm;

      if (this.tempForm) {
        this.unsubscribe('formSub');
        this.unSubscription['formSub'] = this.ngForm.valueChanges.debounceTime(100)
          .distinctUntilChanged().subscribe((value) => console.log(value));
      }
    }
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
    // this.userService.getById(56).subscribe(user => { console.log(user); });
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  }

  getTemplate(contact) {
    return this.selectedUser && this.selectedUser.id == contact.id ? this.editTmpl : this.displayTmpl;
  }

  editContact(contact) {
    this.selectedUser = Object.assign({}, contact);
  }

  saveContact(idx) {
    console.log("Saving contact");
    this.users[idx] = this.selectedUser;
    this.reset();
  }

  reset() {
    this.selectedUser = null;
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
