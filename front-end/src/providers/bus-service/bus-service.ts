import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BusServiceProvider {

  route: string;
  stop: string;
  bus: string;

  constructor(
    private http: HttpClient
  ) {}

  getRoutes(){
    this.http.get('http://localhost:3000/api/routes').subscribe((routes) => {
        console.log(routes);
    })
  }


}
