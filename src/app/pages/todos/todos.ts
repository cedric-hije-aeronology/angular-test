import { Component, inject, signal } from '@angular/core';
import { Todos as TodosService } from '../../services/todos';
import { Todo } from '../../model/todo.type';
import { catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TodoItem } from '../../components/todo-item/todo-item';

@Component({
  selector: 'app-todos',
  imports: [TodoItem],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  todoService = inject(TodosService)
  errorMessage = signal('')
  todoItems = signal<Array<Todo>>([])

  constructor() {
    this.todoService
      .getTodosFromApi()
      .subscribe({
        next: todos => {
          this.todoItems.set(todos)
        },
        error: err => {
          console.log(err);
          this.errorMessage.set(err?.error?.message || err?.message || 'Unknown error occured')
        }
      })
  }

  updateTodoItem(updatedTodo : Todo) {
    this.todoItems.update(todos => 
      todos.map(todo => 
        todo.id === updatedTodo.id ? {...todo, completed: !todo.completed} : todo
      )
    )
  }
}
