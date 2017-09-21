import { Component, OnChanges, DoCheck, NgZone } from '@angular/core';
import { Owner, Todo, todos as initialData } from "./todo";

import { fadeInAnimation } from '../core/animations/index';

@Component({
  selector: 'app-todo',
  template: `<div>
  <todo-list [todos]="todos" (addTodo)="onAdd()" [callback]="callback"></todo-list>
</div>
<div>{{message}}</div>
<button (click)="toggleFirst()">Toggle First Item</button>
<button (click)="addTodo()">Add Todo to List</button>`,
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
/*
* https://github.com/jhades/blog.angular-university.io/tree/master/ng2-change-detection
* https://github.com/jhades/blog.angular-university.io/tree/master/ng2-rxjs
*/
export class TodoAppComponent {

  todos: Array<Todo> = initialData;
  message: string;
  callback: Function = (message) => {
    const t = setTimeout(() => {
      console.log('setting message...');
      this.message = message;
      clearTimeout(t);
    });
  };

  constructor(private ngZone: NgZone) {
  }

  toggleFirst() {
    this.todos[0].completed = !this.todos[0].completed;
  }

  addTodo() {
    const newTodos = this.todos.slice(0)
      , id = (newTodos.length + 1);
    newTodos.push(new Todo(id, 'TODO ' + id, false, new Owner('John', 'Doe')));
    this.todos = newTodos;
  }

  onAdd() {
    this.message = 'Adding Todo ...';
    this.addTodo();
  }
}
