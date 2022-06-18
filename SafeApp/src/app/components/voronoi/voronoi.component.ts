import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-voronoi',
  templateUrl: './voronoi.component.html',
  styleUrls: ['./voronoi.component.scss'],
})
export class VoronoiComponent implements OnInit {
  GRIDSIZE = 2;
  JITTER = 0.5;

  constructor() { }

  ngOnInit() {
    const points = this.generatePoints()
    this.drawPoints(document.getElementById("map"), points);
  }

  generatePoints(){
    let points = [];
    for (let x = 0; x <= this.GRIDSIZE; x++) {
      for (let y = 0; y <= this.GRIDSIZE; y++) {
        //points.push({x: x + this.JITTER * (Math.random() - Math.random()),
        //              y: y + this.JITTER * (Math.random() - Math.random())});
        points.push({x: x*100 , y: y*100});
      }
    }
    return points
  }

  drawPoints(canvas, points) {
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
    ctx.rect(0, 0, 300, 300);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    ctx.scale(200,200);

    ctx.restore();    
}

}
