import { Component, inject, signal } from '@angular/core';
import { Todos as TodosService } from '../../services/todos';
import { Todo } from '../../model/todo.type';
import { TodoItem } from '../../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItem, FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  todoService = inject(TodosService)
  errorMessage = signal('')
  todoItems = signal<Array<Todo>>([])
  searchInput = signal('')

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
