import { TodoListItemComponent } from './components/todo/todo-list-item/todo-list-item.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { Component } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import {
  RouterModule,
  Routes,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from "@angular/router";
const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "todos",
    component: TodoListComponent,
  },
  {
    path: "auth",
    component: AuthComponent
  },

];
export const routing = RouterModule.forRoot(routes);
