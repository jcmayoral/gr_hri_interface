import { Component, OnInit } from '@angular/core';
//import { File } from '@ionic-native/file/ngx';
import {RequestsService} from '../../services/requests.service'

@Component({
  selector: 'app-launch-sensors',
  templateUrl: './launch-sensors.page.html',
  styleUrls: ['./launch-sensors.page.scss'],
})
export class LaunchSensorsPage implements OnInit {
  COMPONENTS: any;

  constructor(
    //private file:File
    private req: RequestsService
  )
  {
    //this.readFile()
    this.loadComponents()
  }

  ngOnInit() {
  }

  async loadComponents(){
    this.COMPONENTS = (await this.req.get("get_roslaunchs")).data.available
    /*
    for (const c of components){
      var data={
        component: c,
        isChecked: false
      }
      this.COMPONENTS.push(data);
    }
    */
  }

  async runLaunch(launch_id, event){
    const response = await this.req.post3("run_roslaunchs",  {"id": launch_id});
    console.log(response["data"].is_sucess, launch_id);  
    var index = this.COMPONENTS.findIndex(function(e, i){
      return e.name == launch_id
    })
    this.COMPONENTS[index].isrunning = response["data"].is_sucess
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
