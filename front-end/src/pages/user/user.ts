import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';

import { BusRoutesPage} from '../bus-routes/bus-routes';
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
      console.log('getRoutes results: ', result);
      this.userRoutes = result;
    })
  };

  selectNewRoute(){
    console.log('selected new route');
    this.navCtrl.push(BusRoutesPage);
  }

  // function for selecting a favorite route (will redirect to bus/stop select)

  //function for deleting a route
  deleteRoute(route){
    console.log('delete this route', route)
    this.userService.deleteUserRoute(route);

    this.userRoutes.splice(this.userRoutes.indexOf(route), 1);
  }


}
