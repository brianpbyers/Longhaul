import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

import { BusServiceProvider } from '../../providers/bus-service/bus-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html',
})
export class EtaPage {

  busRoute: any;
  busStop: any;
  bus: any;
  busStopNumber: any;
  ETA: any;
  isLoggedIn: boolean = false;

  
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  constructor(
    private navCtrl: NavController, 
    public platform: Platform,
    private navParams: NavParams,
    private busService: BusServiceProvider,
    private userService: UserServiceProvider,
    public alertCtrl: AlertController, 
    public localNotifications: LocalNotifications
  ) {this.notifyTime = moment(new Date()).format();
    
           this.chosenHours = new Date().getHours();
           this.chosenMinutes = new Date().getMinutes();
    
           this.days = [
               {title: 'Monday', dayCode: 1, checked: false},
               {title: 'Tuesday', dayCode: 2, checked: false},
               {title: 'Wednesday', dayCode: 3, checked: false},
               {title: 'Thursday', dayCode: 4, checked: false},
               {title: 'Friday', dayCode: 5, checked: false},
               {title: 'Saturday', dayCode: 6, checked: false},
               {title: 'Sunday', dayCode: 0, checked: false}
           ];}


  ionViewWillEnter(){
    // verifying if user is logged in or not
    this.isLoggedIn = this.userService.isLoggedIn;
  }


  ionViewDidLoad() {
    // calls update function to get eta for current route/bus/stop
    this.busService.getUpdate().subscribe((res) => {
      this.busRoute = this.busService.selectedRoute.name;
      this.busStop = this.busService.selectedStop.name;
      this.busStopNumber = this.busService.selectedStop.number;
      this.bus = this.busService.selectedBus.bus;
      this.ETA = Math.floor((res.eta - Date.now()) / 1000 / 60) + ' minutes'; 
    })

    // calls function to periodically update eta time
    this.updateEta();
  ;}


 
timeChange(time){
  this.chosenHours = time.hour.value;
  this.chosenMinutes = time.minute.value;
}

addNotifications(){
  
  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

  for(let day of this.days){

      if(day.checked){

          let firstNotificationTime = new Date();
          let dayDifference = day.dayCode - currentDay;

          if(dayDifference < 0){
              dayDifference = dayDifference + 7; // for cases where the day is in the following week
          }

          firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
          firstNotificationTime.setHours(this.chosenHours);
          firstNotificationTime.setMinutes(this.chosenMinutes);

          let notification = {
              id: day.dayCode,
              title: 'Hey!',
              text: 'You just got notified :)',
              at: firstNotificationTime,
              every: 'week'
          };

          this.notifications.push(notification);

      }

  }


  console.log("Notifications to be scheduled: ", this.notifications);

  if(this.platform.is('cordova')){

      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {

          // Schedule the new notifications
          this.localNotifications.schedule(this.notifications);

          this.notifications = [];

          let alert = this.alertCtrl.create({
              title: 'Notifications set',
              buttons: ['Ok']
          });

          alert.present();

      });
  }
}

        
cancelAll(){
  this.localNotifications.cancelAll();
  
     let alert = this.alertCtrl.create({
         title: 'Notifications cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
}

  updateEta(){
    setInterval(() => {
      this.busService.getUpdate().subscribe((res) => {

        // console.log('route: ', res.route);
        // console.log('stop: ', res.stop);
        // console.log('bus: ', res.bus);
        // console.log('eta: ', res.eta);
        
        this.ETA = Math.floor((res.eta - Date.now()) / 1000 / 60) + ' minutes'; 
      })
    }, 120000)
  };


  saveRoute(routeToSave = {
    route_name: this.busRoute,
    stop_number: this.busStopNumber
  }) {
      if (this.userService.isLoggedIn == true) {
        // console.log(this.userService.isLoggedIn);
        this.userService.saveNewRoute(routeToSave);
        this.navCtrl.push(UserPage);
      } else {
        this.navCtrl.push(LoginPage); 
      };
    };


  logIn() {
    this.navCtrl.push(LoginPage);
  };

  signUp(){
    this.navCtrl.push(SignupPage);
  }


};
