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
  JITTER = 0;


  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  link: any;
  node: any;
  simulation: any;

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


  constructor() {
    this.width = 200 - this.margin.left - this.margin.right;
    this.height = 200 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    const points = this.generatePoints()
    console.log("a")
    this.scatter(points);
  }

  generatePoints(){
    let points = [];
    for (let x = 0; x <= 5; x++) {
      for (let y = 0; y <= 5; y++) {
        //points.push({x: x + this.JITTER * (Math.random() - Math.random()),
          //            y: y + this.JITTER * (Math.random() - Math.random())});
        points.push({x: x +this.JITTER*50 , y: y+this.JITTER*50});
      }
    }
    return points
  }

  scatter(data){
    var margin = {top: 50, right: 50, bottom: -50, left: -50};
    var width = this.width; //600 - margin.left - margin.right;
    var height = this.height;//270 - margin.top - margin.bottom;
    //console.log("bbb", width, height)

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


    svg.append("g")        
    .attr("class", "x axis").call(xAxis);
//    .attr("transform", "translate(0," + height + ")")
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


    svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", function(d) { return xscale(+d.x); })
    .attr("cy", function(d) { return yscale(+d.y); })
    .attr("fill", "#69b3a2")


    var line = d3.line()
        .x(function(d) {
            console.log(d.x)
            return xscale(d.x);
        })
        .y(function(d) {
            console.log(d.y, "y")
            return yscale(d.y);
        });


    var data2=[{x:1, y:2}, {x:4, y:3}, {x:1, y:2}, {x:4, y:3}]
    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  }
}
