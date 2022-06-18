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
    //this.makeLines()
  }

  getData(){
    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: 2,
          y: 2,
          status: "A"
        }, {
          x: 0,
          y: 10,
          status: "B"
        }, {
          x: 10,
          y: 5,
          status: "C"
        }, {
          x: 0.5,
          y: 5.5,
          status: "D"
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    }
    return data
  }

  makeLines(){
    const labels = {
      id: 'scatterDataLabels',
      afterDatasetsDraw(chart, args, options){
        const {ctx} = chart;
        ctx.save()
        ctx.font='20px sans-seriff'

        for (let x = 0; x < chart.config.data.datasets.length; x++){
          for (let i = 0; i < chart.config.data.datasets[x].data.length; i++){
            //const textwidth = ctx.measureText(chart.config.data.datasets[x].data[i].status)
            ctx.fillText(chart.config.data.datasets[x].data[i].status,
              chart.getDatasetMeta(x).data[i].x ,
              chart.getDatasetMeta(x).data[i].y)
          }
        }
      }
    }
    const data = this.getData()
    this.scatterChart = new Chart(this.scatterCanvas.nativeElement, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        },
      },
      plugins: [labels]
    })
  }

  makeScatter(){
    const datalabels = {
      id: 'scatterDataLabels',
      afterDatasetsDraw(chart, args, options){
        const {ctx} = chart;
        ctx.save()
        ctx.font='20px sans-seriff'

        for (let x = 0; x < chart.config.data.datasets.length; x++){
          for (let i = 0; i < chart.config.data.datasets[x].data.length; i++){
            //const textwidth = ctx.measureText(chart.config.data.datasets[x].data[i].status)
            ctx.fillText(chart.config.data.datasets[x].data[i].status,
              chart.getDatasetMeta(x).data[i].x ,
              chart.getDatasetMeta(x).data[i].y)
          }
        }
      }
    }
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
        },
      },
      plugins: [datalabels]
    })
  }
}
