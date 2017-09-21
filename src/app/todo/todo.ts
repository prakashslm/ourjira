export class Owner {
  constructor(public firstname: string, public lastname: string) {
  }
}

// import { Owner } from "./owner";
export class Todo {
  constructor(public id: number, public description: string
    , private _completed: boolean, public owner: Owner) {
  }

  get completed() {
    if (this.id == 1 && this._completed) {
      // uncomment to see the change detector on the dev tools
      //debugger;
    }

    return this._completed;
  }

  set completed(completed) {
    this._completed = completed;
  }
}

// import {Todo} from "./todo";
// import {Owner} from "./owner";

let testData = [
  new Todo(1, "TODO 1", false, new Owner("John", "Doe")),
  new Todo(1, "TODO 2", false, new Owner("John", "Doe")),
  new Todo(1, "TODO 3", false, new Owner("John", "Doe"))
];
export const todos = testData;

import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Todo } from "./todo";

@Component({
  selector: 'todo-item',
  template: `<span class="todo noselect" [ngClass]="{completed: todo.completed}" (click)="onToggle()">{{todo.owner.firstname}} - {{todo.description}} - completed: {{todo.completed}}</span>`,
  styles: [`
  .todo {
    cursor:pointer;
  }

  .completed {
    text-decoration: line-through;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* IE/Edge */
    user-select: none;           /* non-prefixed version, currently
                                  not supported by any browser */
  }
  `]
})
export class TodoItem {

  @Input()
  todo: Todo;

  @Output()
  toggle = new EventEmitter<Object>();

  onToggle() {
    this.toggle.emit(this.todo);
  }
}

import { ChangeDetectionStrategy, AfterViewChecked } from "@angular/core";
// import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, AfterViewChecked } from "@angular/core";
// import { TodoItem } from "./todo_item";
// import { Todo } from "./todo";

@Component({
  selector: 'todo-list',
  // uncomment to switch to on-push mode
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // directives: [TodoItem],
  template: `<ul>
  <li *ngFor="let todo of todos;">
    <todo-item [todo]="todo" (toggle)="onToggle($event)"></todo-item>
  </li>
</ul>
<button (click)="blowup()">Trigger Change Detection Loop</button>`
})
export class TodoList implements AfterViewChecked {

  @Input() todos: Array<Todo>;
  @Input() callback: Function;
  @Output() addTodo = new EventEmitter<Object>();

  clicked = false;

  onToggle(todo) {
    console.log("toggling todo..");
    todo.completed = !todo.completed;
  }

  blowup() {
    console.log("Trying to blow up change detection...");
    this.clicked = true;
    this.addTodo.emit(null);
  }

  ngAfterViewChecked() {
    if (this.callback && this.clicked) {
      console.log("changing status ...");
      this.callback(Math.random());
    }
  }
}
