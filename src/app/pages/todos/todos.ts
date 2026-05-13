import { Component, inject, signal } from '@angular/core';
import { Todos as TodosService } from '../../services/todos';
import { Todo } from '../../model/todo.type';
import { catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [AsyncPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  todoService = inject(TodosService)
  errorMessage = signal('')
  todoItems$ = this.todoService.getTodosFromApi().pipe(
                catchError((err) => {
                  console.log(err);
                  this.errorMessage.set(err?.error?.message || err?.message || 'Unknown error occured')
                  return of([]);
                })
              )
}
