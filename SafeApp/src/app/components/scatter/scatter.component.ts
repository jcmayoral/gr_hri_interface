import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ScatterController, LinearScale, PointElement, LineElement } from 'chart.js';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss'],
})
export class ScatterComponent implements AfterViewInit {

  @ViewChild('scatterCanvas') private scatterCanvas: ElementRef;

  scatterChart: any;
  constructor() { }

  ngAfterViewInit() {
    Chart.register(ScatterController, LinearScale, PointElement, LineElement)
    this.makeScatter()
  }

  getData(){
    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    }
    return data
  }

  makeScatter(){
     const data = this.getData()
 
     this.scatterChart = new Chart(this.scatterCanvas.nativeElement, {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    })
  }

}
