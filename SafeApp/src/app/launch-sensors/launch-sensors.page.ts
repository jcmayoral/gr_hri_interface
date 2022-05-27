import { Component, OnInit } from '@angular/core';
//import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-launch-sensors',
  templateUrl: './launch-sensors.page.html',
  styleUrls: ['./launch-sensors.page.scss'],
})
export class LaunchSensorsPage implements OnInit {
  COMPONENTS = [];

  constructor(
    //private file:File
  )
  {
    //this.readFile()
    this.loadComponents()
  }

  ngOnInit() {
  }

  loadComponents(){

    const components = ["IMU", "GPS", "Camera", "LiDAR"]
    for (const c of components){
      var data={
        component: c,
        isChecked: false
      }
      this.COMPONENTS.push(data);
    }
  }

  /*
  async readFile() {
    console.log("here")
    this.file.dataDirectory="."
    var promise = await this.file.readAsText("/home/jose", 'filename');
    console.log(promise, this.file.dataDirectory)
    await promise.then(value => {
      console.log(value);
    });
  }
  */

}
