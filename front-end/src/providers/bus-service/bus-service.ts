import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { BusStopsPage } from '../../pages/bus-stops/bus-stops';


@Injectable()
export class BusServiceProvider {

  selectedRoute: any;
  busStop: string;
  busNumber: string;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  // gets all of the routes
  getRoutes(){
    return this.http.get('http://localhost:3000/api/routes')
  }

  // gets all of the stops
  getStops(selectedRoute){
    console.log(selectedRoute);
    this.selectedRoute = selectedRoute;
    return this.http.get('http://localhost:3000/api/stops/' + this.selectedRoute.name);
    console.log(this.selectedRoute.name);
    // this.navCtrl.push(BusStopsPage, this.selectedRoute.name)
  }


}
