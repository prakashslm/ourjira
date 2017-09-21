import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  template: `<ul class="nav nav-bar">
  <li routerLinkActive="active">
    <a routerLink="/home"><i class="fa fa-home"> Dashboard <span class="sr-only">(current)</span></i></a>
  </li>
  <li routerLinkActive="active">
    <a routerLink="/company"><i class="fa fa-bars"> Companies</i></a>
  </li>
  <li routerLinkActive="active">
    <a routerLink="/projects"><i class="fa fa-bars"> Projects</i></a>
  </li>
  <li routerLinkActive="active">
    <a routerLink="/users"><i class="fa fa-bars"> Users</i></a>
  </li>
  <li routerLinkActive="active">
    <a routerLink="/tasks"><i class="fa fa-bars"> Tasks</i></a>
  </li>
  <li routerLinkActive="active">
    <a routerLink="/todo"><i class="fa fa-bars"> Todo</i></a>
  </li>
</ul>`,
  styles: [`:host {
  background-color: rgba(0,0,0,0.8);
  color: #fff;
  position: fixed;
  left: 0;
  top: 50px;
  right: auto;
  bottom: 0;
  width: 20%;
  min-width: 250px;
  z-index: 9999;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

ul {
}`]
})
export class SidebarComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
