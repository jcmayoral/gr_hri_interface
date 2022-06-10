import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  map: Leaflet.Map;

  constructor() { }

  ngOnInit() {console.log("init"); this.leafletMap() }
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    console.log("aaa")
    this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);
    var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    //original 
    //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    Leaflet.tileLayer(url, {
      //attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);


    //Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    //Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
