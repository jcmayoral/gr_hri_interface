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
  x: any;
  y: any;
  svg: any;
  constructor() {
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
        points.push({x: x, y: y});
      }
    }
    return points
  }

  scatter(data){
    var margin = {top: 20, right: 0, bottom: 60, left: 0};
    var width = 100 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;
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

    
    /*
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
    */

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

    /*
    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
    */
    svg.selectAll("dot")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xscale(d.x); })
    .attr("width", 1)
    .attr("y", function(d) { return yscale(d.y); })
    .attr("height", function(d) { return height - yscale(d.y); });
  }
}
