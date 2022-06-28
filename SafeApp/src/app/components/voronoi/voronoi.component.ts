import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../services/requests.service'

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
  constructor(private req: RequestsService) {
  }


  async loadPoints(){
    console.log("start")
    const response = await this.req.get("get_topomap/");
    console.log("response", response.data)
    return await response.data
  }

  generateFakePoints(){
    let points = [];
    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 1; y++) {
        points.push({x: x, y: y});
      }
    }
    return points
  }

  async ngOnInit() {
    const points = await this.loadPoints()
    console.log("a", points)
    this.scatter(points);
  }

  scatter(alldata){
    const data = alldata.points;
    const edges = alldata.edges;
    const m= 120;
    const m2 = 30;
    var margin = {top: m2, right: m, bottom: m2, left: m};
    var width = 500 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
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
    .data(edges)
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", function(d) { return xscale(+d.x); })
    .attr("cy", function(d) { return yscale(+d.y); })
    .attr("fill", "#69b3a2")

    console.log(edges.length, "edges")
    var e0 = edges[0]
    for (let e=-1; e<=edges.lenght; e++){
      console.log("e", e)
      var edg = []
      edg.push(e0)
      edg.push(edges[e])
      console.log(e)
      svg.append("path")
      .datum(edg)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xscale(d.x) })
        .y(function(d) { return yscale(d.y) })
      )  
    }



    svg.selectAll("dot")
    .data(edges)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xscale(d.x); })
    .attr("width", 1)
    .attr("y", function(d) { return yscale(d.y); })
    .attr("height", function(d) { return height+yscale(+d.y); });
  }
}
