import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusServiceProvider {

  selectedRoute: any;
  selectedStop: any;
  selectedBus: any;

  constructor(
    private http: HttpClient
  ) {}

  // gets all of the routes
  getRoutes(){
    return this.http.get('http://localhost:3000/api/routes');
  }

  // gets all of the stops
  getStops(): any{
    const stopsURL = `http://localhost:3000/api/stops/${this.selectedRoute.name}`;

    return this.http.get(stopsURL);
    // console.log('bus stops: ', this.busStop);
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

  getUpdate(){
    return 
  }

}
