import {RequestsService} from '../../services/requests.service'
import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AfterViewInit, OnInit} from '@angular/core';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})

export class MapPage implements AfterViewInit, OnInit{

  private _ELEMENT : any;
  @ViewChild('Obj') canvasEl: ElementRef;
  private _SCENE : any;
  private _CAMERA : any;
  public renderer : any;
  private _GEOMETRY : any;
  public _MATERIAL : any;
  public _CUBE : any;
  public _CONTROLS : any;

  constructor(
	  public navCtrl: NavController, 
     public req : RequestsService,
  )
   {
      this.setup()
   }
  
  ngAfterViewInit()
   {
      this.initialiseWebGLObjectAndEnvironment();
      this.renderAnimation();
   }
   ngOnInit(): void {
      this.ngAfterViewInit()
   }

   async initialiseWebGLObjectAndEnvironment()
   {

      // Reference the DOM element that the WebGL generated object 
      // will be assigned to
      this._ELEMENT  = this.canvasEl.nativeElement;


      // Define a new ThreeJS scene
      this._SCENE = new THREE.Scene();

      this._CAMERA = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );


      // Define an object to manage display of ThreeJS scene
      this.renderer = new THREE.WebGLRenderer();


      //CONTROLS
      this._CONTROLS = new OrbitControls( this._CAMERA, this.renderer.domElement );


      // Resizes the output canvas to match the supplied width/height parameters
      this.renderer.setSize( window.innerWidth, window.innerHeight );


      // Attach the canvas, where the renderer draws the scene, to the specified DOM element 
      this._ELEMENT.appendChild( this.renderer.domElement );


      // BoxGeometry class allows us to create a cube (with width, height and depth dimensions supplied as 
      // parameters - default is 1 for these values) 
      //this._GEOMETRY            = new THREE.BoxGeometry( 1, 1, 1 ); 
      //console.log("RESPONSE " , points)


      // Define the material (and its appearance) for drawing the geometry to the scene
      this._MATERIAL            = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe : true } );


      // Use the Mesh class to define a polygon mesh based object with the supplied geometry and material objects

      this._GEOMETRY = new THREE.BufferGeometry();

      // itemSize = 3 because there are 3 values (components) per vertex
      this._GEOMETRY.morphAttributes.position = []
      //this._GEOMETRY.morphAttributes.color = []
      //this._GEOMETRY.morphAttributes.position[0] = new THREE.BufferAttribute(vertices, 3)
      //this._GEOMETRY.morphAttributes.color[0] = new THREE.BufferAttribute(vertices, 3)

      //this._GEOMETRY.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

      this._CUBE                = new THREE.Mesh( this._GEOMETRY, this._MATERIAL );
      //this._CUBE                = new THREE.Points( this._GEOMETRY, this._MATERIAL );

      // Add the object to the scene
      //this._SCENE.add(this._CUBE);
      //return;
      /*
      var vertices2 = [];

      for ( let i = 0; i < 10000; i ++ ) {
         const x = THREE.MathUtils.randFloatSpread( 2000 );
         const y = THREE.MathUtils.randFloatSpread( 2000 );
         const z = THREE.MathUtils.randFloatSpread( 2000 );

         vertices2.push( x, y, z );
      }
      */
     await this.load_pc();
   }

   async load_pc(){
      this._SCENE.remove(this._CUBE)
      const points =  await (await this.req.get("get_pointcloud"))
      let vertices3 = []
      
      points.data.data.forEach(element => {
         vertices3.push(element[0], element[1], element[2])
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute(vertices3, 3 ) );
      const material = new THREE.PointsMaterial( { color: 0xFFFFFF, size: 0.1 } );
      this._CUBE = new THREE.Points( geometry, material );
      this._SCENE.add( this._CUBE );

      // Define the depth position of the camera
      this._CAMERA.position.z   = 20;

   }

   setup(){
      setTimeout(x => 
         {
            console.log("timer")
            this.load_pc()
            this.setup();
         }, 5000);     
   }
   
   _animate ()
   {

      requestAnimationFrame(()=>
      {
         this._animate();
      });

      // Define rotation speeds on x and y axes - lower values means lower speeds
      //this._CUBE.rotation.x += 0.015;
      //this._CUBE.rotation.z += 0.015;
      if (this._CONTROLS){
         console.log("UPDATE CONTROLS")
         this._CONTROLS.update();
      }


      // Render the scene (will be called using the requestAnimationFrame method to ensure the cube is constantly animated)
      this.renderer.render(this._SCENE, this._CAMERA);
   };
   
   
   renderAnimation()
   {
      //if (Detector.webgl) 
      //{
         this._animate();
      /*
      }
      else {
         var warning = Detector.getWebGLErrorMessage();
         console.log(warning);
      }
      */

   }
}
