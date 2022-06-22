import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';
//import { ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';


const iconRetinaUrl = 'assets/icon/my-icon.png';
const iconUrl = 'assets/icon/my-icon.png';
const shadowUrl = 'assets/icon/my-icon.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [2, 2],
  iconAnchor: [1.2, 1.2],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mymap: ElementRef;
  map: L.Map;
  apiKey = "AIzaSyBltjbC3PeZfQP59CaTvzaYuR15kcxHBeQ";


  constructor() { }

  ngOnInit() {
    console.log("init");
    //this.leafletMap()
  }

  ngAfterViewInit(): void {
    console.log("here")
    //this.leafletMap()
    this.googleMap()
  }

  async googleMap(){
    const mapRef = document.getElementById('map');
    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
    // Add a marker to the map
    const markerId = await newMap.addMarker({
      coordinate: {
        lat: 33.6,
        lng: -117.9
      }
    });

    // Move the map programmatically
    await newMap.setCamera({
      coordinate: {
        lat: 33.6,
        lng: -117.9
      }
    });

    // Enable marker clustering
    await newMap.enableClustering();

    // Handle marker click
    await newMap.setOnMarkerClickListener((event) => {
      console.log(event)
    });

  }


  async leafletMap() {
    /*
    console.log("aaaA")
    this.map = Leaflet.map('mapId',{
      zoomControl: false,
      attributionControl: false
    }).setView([19.397391, -99.182275], 10);
    console.log("aaaN")

    var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    //original 
    //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //setTimeout(
    //  Leaflet.tileLayer(url, {
    //    autopan: false,
    //    layers: []
      //attribution: 'edupala.com © Angular LeafLet',
    //  }).addTo(this.map), 10000
    //)

    
    console.log("bbb")

    //setTimeout(function(){ this.map}, 500);

    //Leaflet.Marker([-150, 300]).addTo(this.map).bindPopup('Delhi').openPopup();
    Leaflet.marker([19.497391, -99.082275]).addTo(this.map).bindPopup('Leh').openPopup();

    
    //antPath([[19.397391, -99.182275], [34.1526, 77.5771]],
    //  { color: '#FFFF00', weight: 50, opacity: 1.0 })
    //  .addTo(this.map);
    */

    this.map = L.map("map",{
      zoomControl: true})

    var bounds = [
      [19.397391, -99.182275],
      [19.403516, -99.167656]
    ];
    //this.map.fitBounds(bounds)
    console.log("aaaN", this.map, this.mymap)

    var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    //original 
    //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //setTimeout(
    //  Leaflet.tileLayer(url, {
    //    autopan: false,
    //    layers: []
      //attribution: 'edupala.com © Angular LeafLet',
    //  }).addTo(this.map), 10000
    //)

    await L.tileLayer(url, {
      maxZoom: 20,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //this.map.dragging.disable()
    this.map.setView([19.402069, -99.171111],12);
    //var marker = L.marker([19.402069, -99.171111])
    //var bounds = this.map.getBounds();
    //this.map.setView([19.402069, -99.171111], 10);
    //marker.addTo(this.map);
    //L.marker([19.402069, -99.171121]).addTo(this.map);
    //var marker2 = new L.Marker(new L.LatLng(19.402069, -99.171131));
    //this.map.addLayer(marker2);
    // .bindPopup('Map Frame').openPopup();
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    //await newMap.destroy();

    //this.map.remove();
  };

}
