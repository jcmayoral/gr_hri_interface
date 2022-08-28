import { RequestsService } from './../../services/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safe-header',
  templateUrl: './safe-header.component.html',
  styleUrls: ['./safe-header.component.scss'],
})
export class SafeHeaderComponent implements OnInit {

  constructor(private req : RequestsService) {}

  ngOnInit() {}

  async lock(){
    console.log("lock")
    const response = await this.req.lock()
    console.log("response", response)
  }

}
