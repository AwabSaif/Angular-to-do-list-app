import { Component, ViewChild, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {
  center: google.maps.LatLngLiteral = {  lat: 21.577651034948016, lng: 39.224923807310894 }; 
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
 
  
    addMarker(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng) { 
      this.markerPositions.push(latLng.toJSON());
    }
  }
}
