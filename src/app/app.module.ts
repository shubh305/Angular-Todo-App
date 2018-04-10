import { AuthInterceptor } from './auth/auth.interceptor';
import { TodoEffects } from './store/todo/todo.effects';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component'
import { TodoListItemComponent } from './components/todo/todo-list-item/todo-list-item.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import * as TodoReducer from './store/todo/todo.reducer';
import { TodoDetailsComponent } from './components/todo/todo-details/todo-details.component';
import { AuthComponent } from './auth/auth.component';
import { routing } from './app.route';
import { NgModel } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoDetailsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'todo-app' }),
    HttpClientModule,
    BrowserTransferStateModule,
    StoreModule.forRoot({ todos: TodoReducer.TodoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    FormsModule,
    routing
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
