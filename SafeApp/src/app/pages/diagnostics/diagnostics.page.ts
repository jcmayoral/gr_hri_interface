import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.page.html',
  styleUrls: ['./diagnostics.page.scss'],
})
export class DiagnosticsPage implements OnInit {

  MTBI : number
  MTCI: number
  MTBF : number
  MTTF: number
  nodes: []

  constructor(private req : RequestsService) { 
    this.nodes = []
  }

  async ngOnInit() {
    const diagnostics = await this.req.get("get_diagnostics")
    this.MTTF = diagnostics.data.MTTF
    this.MTBI = diagnostics.data.MTBI
    this.MTBF = diagnostics.data.MTBF
    this.MTCI = diagnostics.data.MTCI
    this.nodes = diagnostics.data.rosnodes
    console.log(this.nodes)
  }

}
