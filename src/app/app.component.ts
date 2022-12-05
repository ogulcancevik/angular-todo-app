import { Component, OnInit, ViewChild } from '@angular/core';
import { ITodo } from './global.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  text: string = '';
  todos: ITodo[] = [];
  @ViewChild('todoInput') todoInput: any;
  onInputChange(event: any) {
    this.text = event.target.value;
  }
  addTodo() {
    const isTodoExist = this.todos.find(
      (todo: ITodo) => todo.title === this.text
    );
    if (isTodoExist) {
      alert('Todo already exist');
      return;
    }
    if (!this.text) return;
    this.text = this.text.trim();
    this.todos.push({
      id: this.todos.length + 1,
      title: this.text,
      completed: false,
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.text = '';
  }
  onChecked(id: number) {
    const todo = this.todos.find((todo: ITodo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  onDelete(id: number) {
    this.todos = this.todos.filter((todo: ITodo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  ngOnInit() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  }
}
