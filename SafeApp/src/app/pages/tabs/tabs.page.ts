import { Router } from '@angular/router';
import { User } from './../../shared/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private user: User, private router: Router) {}

  async ngOnInit() {
      console.log("on init tabs")
      console.log(!await this.user.isLoggedIn())
      if (!await this.user.isLoggedIn()){
        console.log("not login")
        this.router.navigateByUrl("login")
      }
  }

  logout(){
    this.user.logout()
  }

}
