import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BusServiceProvider } from '../../providers/bus-service/bus-service';

import { BusRoutesPage} from '../bus-routes/bus-routes';
import { BusNumberPage } from '../bus-number/bus-number';
import { LoginPage } from '../login/login';

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
    private userService: UserServiceProvider,
    private busService: BusServiceProvider
  ) {}

  ionViewCanEnter(){
    if (this.userService.isLoggedIn) {
      return true;
    } else {
      this.navCtrl.push(LoginPage);
    };
  };

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
  goToRoute(route){
    this.userService.goToUserRoute = true;
    this.busService.setRoute({
      name: route.route_name,
      description: route.description
    });
    this.busService.setStop({
      number: route.stop_number,
      name: route.name
    })
    this.navCtrl.push(BusNumberPage);
  }

  //function for deleting a route
  deleteRoute(route){
    console.log('delete this route', route)
    this.userService.deleteUserRoute(route);

    this.userRoutes.splice(this.userRoutes.indexOf(route), 1);
  }


}
