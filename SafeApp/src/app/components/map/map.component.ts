import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
      const map = L.map(this.mapElement.nativeElement, {
          center: [this.lat, this.lng],
          zoom: 10,
          layers: [L.tileLayer("https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320")],
          zoomControl: true
      });
      setTimeout(() => {
          map.invalidateSize();
      }, 1000);
  }


}
