import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BusStopsPage } from '../../pages/bus-stops/bus-stops';


@Injectable()
export class BusServiceProvider {

  selectedRoute: any;
  busStop: any;
  busNumber: string;

  constructor(
    private http: HttpClient
  ) {}

  // gets all of the routes
  getRoutes(){
    return this.http.get('http://localhost:3000/api/routes')
  }

  // gets all of the stops
  getStops(selectedRoute){
    console.log( 'selected Route: ', selectedRoute);

    this.selectedRoute = selectedRoute;
    console.log( 'route name: ', this.selectedRoute.name);

    const stopsURL = `http://localhost:3000/api/stops/${this.selectedRoute.name}`;

    this.http.get(stopsURL)
    .subscribe((res)=>{
          console.log('bus stops: ', this.busStop);
          this.busStop = res;
          return this.busStop;
    })

  }
}
