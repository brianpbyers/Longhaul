import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserServiceProvider {

  // static get parameters() {
  //   return [Http];
  // }

  isLoggedIn: boolean;
  authToken: any;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private http: Http
  ) {
    this.isLoggedIn = false,
    this.authToken = null;
    // sets url's for dev/prod modes
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:3000/api';
    } else {
      this.baseUrl = '';
    }
  }

// TOKEN HANDLING

  // saves authentication token in local storage
  storeUserCreds(token){
    window.localStorage.setItem('userToken', token);
    this.useCreds(token);
  }

  // sets credentials to local variables
  useCreds(token){
    this.isLoggedIn = true;
    this.authToken = token;
  }

  // loads user token from local storage
  loadUserCreds(){
    let token = window.localStorage.getItem('userToken');
    this.useCreds(token);
  }

  // gets rid of user credentials upon logout
  destroyUserCreds(){
    this.isLoggedIn = false;
    this.authToken = null;
    window.localStorage.clear();
  }

  // User Login functionality
  userLogin(user){
    let creds = `name=${user.name}&password=${user.password}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/login`, creds, { headers: headers }).subscribe((data) => {
        if(data.json().success) {
          this.storeUserCreds(data.json().token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Create new User functionality
  signUp(user){
    var creds = `name=${user.name}&password=${user.password}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/signup`, creds, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

// Functionality for Users (when logged in) //
  
  // Index for all Routes
  getRoutes(){
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log('authorization token: ', this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);
      
      this.http.get(`${this.baseUrl}/userroutes`, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  // Show for one specific route
  showRoute(route){
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log('authorization token: ', this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);

      this.http.get(`${this.baseUrl}/userroutes/${route.id}`, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Post new user route
  saveNewRoute(route){
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log(this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);

      this.http.post(`${this.baseUrl}/userroutes`, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Edit user route
  editUserRoute(route){
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log(this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);

      this.http.put(`${this.baseUrl}/userroutes/${route.id}`, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Delete user route
  deleteUserRoute(route){
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log(this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);

      this.http.delete(`${this.baseUrl}/userroutes/${route.id}`, { headers : headers }).subscribe((data) => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }

}
