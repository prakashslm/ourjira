import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule } from '@angular/router';

import { TodoAppComponent } from './todo-app.component';
import { TodoItem, TodoList } from "./todo";

const routes: Routes = [
  { path: '', component: TodoAppComponent },
  // { path: 'todo', component: TodoAppComponent },
  // { path: '', redirectTo: '/todo', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TodoAppComponent
    , TodoItem
    , TodoList
  ],
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , RouterModule.forChild(routes)
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [TodoAppComponent],
  exports: [TodoAppComponent]
})
export class TodoAppModule { }
