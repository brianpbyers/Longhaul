import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { BusRoutesPage } from '../bus-routes/bus-routes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public http : HttpClient
  ) {
  }

  getStarted(){
    this.navCtrl.push(BusRoutesPage);
  }

  // serverCheck(){
  //   this.http.get('http://localhost:3000/').toPromise()
  //   .catch(err => 
  //       alert('Error:' + err))
  //   .then(function(){
  //     console.log('hit the server');
  //   }) 
  // }

}
