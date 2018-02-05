import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusServiceProvider {

  selectedRoute: any;
  selectedStop: any;
  selectedBus: any;

  constructor(
    private http: HttpClient
  ) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:3000/';
    } else {
      this.baseUrl = '';
    }
  }

  baseUrl: string;

  // gets all of the routes
  getRoutes(){
    console.log('here')
    return this.http.get(`${this.baseUrl}/api/routes`);
  }

  // sets current route
  setRoute(route){
    console.log('route to save', route);
    this.selectedRoute = route;
    console.log('selected route', this.selectedRoute)
  }


  setStop(stop){
    console.log('stop to save', stop);
    this.selectedStop = stop;
    console.log('selected stop', this.selectedStop)
  }

  setBus(bus){
    console.log('bus to save', bus);
    this.selectedBus = bus;
    console.log('selected bus', this.selectedBus);
  }


  getBuses(): any{
    const busURL = `${this.baseUrl}/api/buses/${this.selectedRoute.name}`;

    return this.http.get(busURL);
  }

  // gets all of the stops
  getStops(): any {
    const stopsURL = `${this.baseUrl}/api/stops/${this.selectedRoute.name}/${this.selectedBus.bus}`;

    return this.http.get(stopsURL);
    // console.log('bus stops: ', this.busStop);
  }


  getUpdate(): Observable<any>{
    const etaURL = `${this.baseUrl}/api/update/${this.selectedRoute.name}/${this.selectedStop.number}/${this.selectedBus.bus}`;

    return this.http.get(etaURL);
  }


}
