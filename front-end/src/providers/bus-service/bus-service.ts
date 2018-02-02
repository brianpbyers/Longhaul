import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BusServiceProvider {

  busRoutes: any;
  busStops: string;
  busNumber: string;

  constructor(
    private http: HttpClient
  ) {}

  // gets all of the routes
  getRoutes(){
    return this.http.get('http://localhost:3000/api/routes')
  }

  // gets all of the stops
  getStops(){
    return this.http.get('http://localhost:3000/api/stops')
  }


}
