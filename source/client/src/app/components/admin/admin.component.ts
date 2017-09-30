/// <reference types="datatables.net" />

import { Component, AfterViewChecked, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';
import * as DataTables from '@datatables.net';

import { fadeInAnimation } from '../../core/animations/index';

import { User } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  // styleUrls: ['./admin.component.css'],
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': 'true' }
})
export class AdminComponent implements OnDestroy, OnInit, AfterViewChecked {
  unSubscription: { [index: string]: Subscription; } = {};

  currentUser: User;
  users: User[] = [];
  selectedUser: User;
  tempForm: NgForm;

  lastnameSearch: string = 'vivekanandan';

  @ViewChild('ngForm') ngForm: NgForm;
  @ViewChild('displayTmpl') displayTmpl: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;

  @ViewChild('dt') dt: ElementRef;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.loadAllUsers();
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
    const t = setTimeout(() => {
      (<any>$(this.dt.nativeElement)).DataTable({
        paging: false,
        pageLength: '1',
        order: [[1, 'asc']],
        scrollY: 400
      });
    }, 2000);
  }

  tabNavigate(tab: string): void {
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

/*
https://datatables.net/forums/discussion/40281/angular-2-datatables-and-pagination-using-datatables-net-bs

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Shipment } from '../../models';

@Component({
    selector: 'shipment-list',
    template: `
        <table id="shipments_table" class="table table-striped table-bordered table-hover no-footer">
        </table>
    `,
    styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
    private shipmentsTable: any;
    private tableWidget: any;
    @Input() shipments: Shipment[];
    // Event Emmiter for when the user selects a row
    @Output() shipmentSelected: EventEmitter<Shipment> = new EventEmitter();
    constructor(
        private el: ElementRef // You need this in order to be able to "grab" the table element form the DOM
    ) { }
 
    public ngOnInit() {
        this.loadShipments();
    }
    public loadShipments(): void {
        if (this.tableWidget) {
            this.tableWidget.destroy(); // essentially refreshes the table
            // you can also remove all rows and add new
            // this.tableWidget.clear().rows.add(this.shipments).draw();
        }
        let tableOptions: any = {
            data: this.shipments,
            dom: 'rt',
            select: true,
            columns: [
                { title: 'Content', data: 'content' },
                { title: 'Packages', data: 'packages' },
                { title: 'Weight', data: 'weight' }
            ]
        }
        this.shipmentsTable = $(this.el.nativeElement.querySelector('table'));
        this.tableWidget = this.shipmentsTable.DataTable(tableOptions);
        this.tableWidget.on('select', (e, dt, type, indexes) => {
            // I DIDN'T TRY THIS IN HERE...Just debug it and check the best way to emit an actual object
            this.shipmentSelected.emit(this.shipments[indexes[0]]);
        });
        const tableAPI = this.tableWidget.api()
    }
}
*/

