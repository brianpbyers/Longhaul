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

  getRoutes(){
    return this.http.get('http://localhost:3000/api/routes')
  }


}
