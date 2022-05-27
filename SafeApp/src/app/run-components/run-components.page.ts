import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run-components',
  templateUrl: './run-components.page.html',
  styleUrls: ['./run-components.page.scss'],
})
export class RunComponentsPage implements OnInit {
  COMPONENTS = [];

  constructor() {
    this.loadComponents()
  }

  ngOnInit() {
  }

  loadComponents(){
    var data={
      component: "IMU",
      isChecked: false
    }
    this.COMPONENTS.push(data);
  }

}
