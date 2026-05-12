import { Component, inject, signal } from '@angular/core';
import { Todos as TodosService } from '../../services/todos';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  todoService = inject(TodosService)
}
