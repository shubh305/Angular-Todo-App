import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  RouterModule,
  Routes,
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signupButton() {
    debugger
    document.getElementById('user_options-forms').classList.remove('bounceRight')
    document.getElementById('user_options-forms').classList.add('bounceLeft')
  }
  loginButton() {
    debugger
    document.getElementById('user_options-forms').classList.remove('bounceLeft')
    document.getElementById('user_options-forms').classList.add('bounceRight')
  }
  body: any;
  email: any;
  password: any;
  name: any;
  response: any;
  authLogin() {
    this.body = {
      email: this.email,
      password: this.password
    }
    this.http.post(`${environment.client.base_url}/users/login`, this.body).subscribe(response => {
      debugger
      this.response = response
      console.log(response)
      localStorage.setItem('token', this.response.token);
      this.router.navigate(["/todos"]);
    }),
      err => {
        console.log(err)
      }
  }
  authRegister() {
    this.body = {
      email: this.email,
      password: this.password,
      name: this.name
    }
    this.http.post(`${environment.client.base_url}/users`, this.body).subscribe(response => {
      debugger
      console.log(response)
      this.response = response
      console.log(response)
      localStorage.setItem('token', this.response.token);
      this.router.navigate(["/todos"]);
    }),
      err => {
        console.log(err)
      }
  }
}
