import { TodoState } from './todo.state';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as TodoActions from './todo.action';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }
  todos: any = []
  todosData: any
  items: any = []
  data: any

  @Effect()
  GetTodos$: Observable<Action> = this.actions$.
    ofType<TodoActions.GetTodos>(TodoActions.GET_TODOS)
    .mergeMap(action =>
      this.http.get(environment.client.base_url + '/todos')
        .map((data: Response) => {
          debugger
          this.items = data
          for (let i = 0; i < this.items.data.docs.length; i++) {
            if (this.items.data.docs[i].completedAt != null) {
              var utcDate = Math.floor(this.items.data.docs[i].completedAt / 1000)
              var date = new Date(0);
              this.items.data.docs[i].date = date.setUTCSeconds(utcDate);
              if (this.items.data.docs[i].completed == true) {
                this.items.data.docs[i].status = "Completed"
              }
            }
          }
          console.log(data);
          return new TodoActions.GetTodosSuccess(this.items["data"]["docs"] as TodoState[]);
        })
        .catch(() => of(new TodoActions.GetTodoError()))
    );

  @Effect()
  createTodo$: Observable<Action> = this.actions$.
    ofType<TodoActions.CreateTodo>(TodoActions.CREATE_TODO)
    .mergeMap(action =>
      this.http.post(environment.client.base_url + '/todos', action.payload)
        .map((data: Response) => {
          debugger
          return new TodoActions.CreateTodoSuccess({
            ...data["data"], loading: false
          });
        })
        .catch(() => of(new TodoActions.CreateTodoError()))
    );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.
    ofType<TodoActions.DeleteTodo>(TodoActions.DELETE_TODO)
    .mergeMap(action =>
      this.http.delete(environment.client.base_url + '/todos/' + action.payload._id)
        .map((data: Response) => {
          debugger
          return new TodoActions.DeleteTodoSuccess({
            ...action.payload, loading: false
          });
        })
        .catch(() => of(new TodoActions.DeleteTodoError(action.payload)))
    );

  @Effect()
  updateTodo$: Observable<Action> = this.actions$.
    ofType<TodoActions.UpdateTodo>(TodoActions.UPDATE_TODO)
    .mergeMap(action =>
      this.http.patch(environment.client.base_url + '/todos/' + action.payload._id, action.payload)
        .map((data: Response) => {
          debugger
          this.data = data
          if (this.data.completed != false) {
            action.payload.status = "Completed"
            action.payload.date = this.data.completedAt
          }
          return new TodoActions.UpdateTodoSuccess({
            ...action.payload, loading: false, editing: false
          });
        })
        .catch(() => of(new TodoActions.DeleteTodoError(action.payload)))
    );

}
