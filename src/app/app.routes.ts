import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./pages/home/home').then(m => m.Home)
        }
    },
    {
        path: 'todos',
        loadComponent: () => {
            return import('./pages/todos/todos').then(m => m.Todos)
        }
    }
];
