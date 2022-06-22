import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
//import * as d3Scale from 'd3-scale';
//import * as d3Array from 'd3-array';
//import * as d3Axis from 'd3-axis'

@Component({
  selector: 'app-voronoi',
  templateUrl: './voronoi.component.html',
  styleUrls: ['./voronoi.component.scss'],
})
export class VoronoiComponent implements OnInit {
  GRIDSIZE = 50;
  JITTER = 0.5;

  //d3
  barData = [
    { season: 'S1', viewers: 2500000 },
    { season: 'S2', viewers: 3800000 },
    { season: 'S3', viewers: 5000000 },
    { season: 'S4', viewers: 6900000 },
    { season: 'S5', viewers: 6900000 },
    { season: 'S6', viewers: 7500000 },
    { season: 'S7', viewers: 10000000 },
    { season: 'S8', viewers: 17000000 }
  ];
  title = 'Game of Thrones';
  subtitle = 'Viewers per season for';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;


  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    const points = this.generatePoints()
    /*
    this.drawPoints(document.getElementById("map"), points);
    this.init();
    this.initAxes();
    this.drawAxes();
    this.drawChart();
    */
    this.scatter(points);
  }

  generatePoints(){
    let points = [];
    for (let x = 0; x <= this.GRIDSIZE; x++) {
      for (let y = 0; y <= this.GRIDSIZE; y++) {
        //points.push({x: x + this.JITTER * (Math.random() - Math.random()),
        //              y: y + this.JITTER * (Math.random() - Math.random())});
        points.push({x: x , y: y});
      }
    }
    return points
  }

  drawPoints(canvas, points) {
    var heightRatio = 1.5;
    canvas.height = canvas.height * heightRatio
    canvas.width= canvas.width * heightRatio

    let ctx = canvas.getContext('2d');
    ctx.save();

    
    //ctx.fillStyle = "hsl(0, 50%, 50%)";
    ctx.font = '0.3px serif';
    ctx.fillStyle = "#ff0000"; //<======= here
    var lastpoint =[0,0]
    ctx.lineWidth =0.5;

    for (let {x, y} of points) {
        ctx.beginPath();
        ctx.arc(x, y, 0.1, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillText("hello",x,y)
        //ctx.endPath()
        // Connects the current point to the next
        ctx.beginPath();
        ctx.moveTo(lastpoint[0], lastpoint[1]);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastpoint = [x,y]

    }
    ctx.closePath()

    ctx.beginPath();
    ctx.rect(0, 0, 300, 200);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    //ctx.scale(200,200);

    ctx.restore();    
  }
  init() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxes() {
    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.barData.map((d) => d.season));
    this.y.domain([0, d3.max(this.barData, (d) => d.viewers)]);
  }

  drawAxes() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x))
      .attr('font-size', '30');
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('font-size', '50')
      .text('viewers');
  }

  drawChart() {
    this.g.selectAll('.bar')
      .data(this.barData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('x', (d) => this.x(d.season))
      .attr('y', (d) => this.y(d.viewers))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.viewers));
  }


  scatter(data){
    var margin = {top: 50, right: 50, bottom: -50, left: -50};
    var width = this.width; //600 - margin.left - margin.right;
    var height = this.height;//270 - margin.top - margin.bottom;
    console.log("bbb", width, height)

    var xscale = d3.scaleLinear()
              .domain(d3.extent(data, function(d) { return +d.x; }))  
              .range([0, width]);
    var yscale = d3.scaleLinear()
              .domain(d3.extent(data, function(d) { return +d.y; }))
              .range([height, 0]);
    var xAxis = d3.axisBottom().scale(xscale);
    var yAxis = d3.axisLeft().scale(yscale);
    var svg = d3.select("#content-box").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", function(d) { console.log(xscale(+d.x)); return xscale(+d.x); })
    .attr("cy", function(d) { console.log(yscale(+d.y)); return yscale(+d.y); });


     svg.append("g")        
    .attr("class", "x axis")
    //.attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    
    svg.append("text")
    //.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("x");
    
    svg.append("g")        
    .attr("class", "y axis")
    .call(yAxis);
    // Add the text label for the Y axis
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("y");

    console.log("finished")
  }

}
