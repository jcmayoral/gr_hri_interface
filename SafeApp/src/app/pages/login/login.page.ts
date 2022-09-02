import { User } from './../../shared/user';
import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  router:  Router, protected user: User) { }

  ngOnInit() {
    if (this.user.isLoggedIn()){
      this.router.navigateByUrl("tabs")
    }
  }

  signin(user, password){
    console.log(user.value, password.value)
    this.user.login(user, "AAAA")
    this.router.navigateByUrl("tabs")
  }

}
