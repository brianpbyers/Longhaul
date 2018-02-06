import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';

import { BusNumberPage } from '../bus-number/bus-number';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  userRoutes: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userService: UserServiceProvider
  ) {}

  ionViewWillEnter(){
    this.userService.getRoutes().then((result) => {
      console.log(result);
      this.userRoutes = result;
    })
  };

  // function for selecting a favorite route (will redirect to bus/stop select)

  // function for editing a route
    // possibly use a form?

  //function for deleting a route


}
