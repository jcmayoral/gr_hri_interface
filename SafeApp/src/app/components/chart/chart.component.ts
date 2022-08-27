import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, LineElement, PointElement, DoughnutController, BarController, Legend, LineController, ArcElement, CategoryScale, LinearScale, BarElement, PieController} from 'chart.js' 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;


  constructor() { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    this.barChartMethod();
    this.doughnutChartMethod();
    //this.lineChartMethod();
  }

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Legend) 
    const labels = ["TOTAL TIME", "COLLECT", "CUT"]
    const times = [200, 100,100]
  
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: 'Time of Execution',
          data: times,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      }
    })  
  }

  doughnutChartMethod() {
    Chart.register(DoughnutController, ArcElement, PieController, Legend) 
    const mydatasets = [{
      labels: ['A', 'B'],
      label: 'CUT',
      data: [50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ]}, 
      {
        labels: ['A', 'B'],
        label: 'COLLECTING',
        data: [400, 1200],
        backgroundColor: [
          'rgb(255, 0, 0)',
          'rgb(0, 0, 255)',
      ]
    }]


    const mydata = {
      labels: ['RUN', 'Change Row'],
      datasets: mydatasets
    };

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement,{
      type: 'pie',
      data: mydata,
      options: {
        responsive: true,
        aspectRatio: 1,
        plugins:{
          legend: {
            display: true,
          }
        }
        //maintainaApectRatio: true,
      },
    });
    console.log(this.doughnutChart.legend)
    /*
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, 
      {
        type: 'doughnut',
        data: mydata,
        options: {
          radius: 100,
          responsive:  true,
          plugins:{
            legend: {
              display: true,
              labels:{
                color: 'black'
              },
              rtl: true,
              title:{
                display: true,
                text: "HOLA MUNDO"
              }
            },
          }
        }
      }
      );
      */
  }

  lineChartMethod() {
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement) 

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            //lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }
}