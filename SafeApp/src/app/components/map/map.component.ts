import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import * as L from 'leaflet';
//import * as L from 'leaflet.gridlayer.googlemutant';
import 'leaflet/dist/leaflet.css';
import { antPath } from 'leaflet-ant-path';
//import { ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import {RequestsService} from '../../services/requests.service'


const iconRetinaUrl = 'assets/icon/marker-icon-2x.png';
const iconUrl = 'assets/icon/marker-icon.png';
const shadowUrl = 'assets/icon/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [20, 20],
  iconAnchor: [20, 20],
  popupAnchor: [1, -1],
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
  @ViewChild('map2') mymap2: ElementRef;

  map: L.Map;
  newMap : GoogleMap;
  apiKey = "AIzaSyBltjbC3PeZfQP59CaTvzaYuR15kcxHBeQ";
  options: any
  node_selection: []
  list_nodes

  constructor(private req : RequestsService) {
    this.list_nodes = []
   }

  ngOnInit() {
    console.log("init");
    //this.leafletMap()
  }

  ngAfterViewInit(): void {
    console.log("here")
    this.leafletMap()
    //this.googleMap()
  }

  async googleMap(){
    const mapRef = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });
    // Add a marker to the map
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: 33.6,
        lng: -117.9
      }
    });

    // Move the map programmatically
    await this.newMap.setCamera({
      coordinate: {
        lat: 33.2,
        lng: -117.9
      }
    }).then((a)=>{console.log("set camera")});
    // Enable marker clustering
    await this.newMap.enableClustering();

    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
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

    */

    console.log("OSSM ")

    const osm_map = await this.req.get("get_osm_topomap");
    console.log("OSM", osm_map);

    var bounds = [
      [19.397391, -99.182275],
      [19.403516, -99.167656]
    ];

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

    const house = [19.397507, -99.161707]
    const point2 = [19.388073, -99.182993]

    
    //var streets = L.tileLayer(url, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1});

    this.map = L.map("map2",{
      zoomControl: true,
      autopan: true,
      //center: L.latLng(house[0], house[1]),
      }
    )

    console.log("aaaN", this.map)

    
    await L.tileLayer(url, {
      //maxZoom: 80,
      zoom: 15,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    
    //this decenters
    //this.map.fitBounds(bounds)

    //this.map.dragging.disable()
    
    
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
        console.log("errro")
      }, 1000);
    });


    /*    
    antPath(([house, point2]),
      { color: '#FFFF00', weight: 5, opacity: 1.0 })
      .addTo(this.map);
    */


    for (let p of osm_map.data.points){
      console.log("marker", p.x, p.y, p.name)
      this.list_nodes.push(p.name)
      let moptions = {title:p.name, alt:"alt", riseOnHover:true, dragable:true, nohide: true}
      L.marker([p.x, p.y], moptions).bindTooltip(p.name).addTo(this.map).openTooltip();
    }

    this.map.setView(house,40);


    //L.marker(house, moptions).bindTooltip('marker1').addTo(this.map).openTooltip();
    //L.marker(point2, moptions).bindTooltip('marker2').addTo(this.map).openTooltip();
    this.renderMap()
  }
  private renderMap(){
    const observer = new MutationObserver(() => {
      console.log('init mutation');
      this.map.invalidateSize();
      observer.disconnect();
      console.log('cancel observer');
    });
    console.log('init observer');
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false,
    });
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    //await newMap.destroy();

    //this.map.remove();
  };

}
