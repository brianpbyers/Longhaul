import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class UserServiceProvider {

  // static get parameters() {
  //   return [Http];
  // }

  isLoggedIn: boolean = false;
  authToken: any;
  baseUrl: string;
  returnMessage: any;
  goToUserRoute: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private http: Http
  ) {
    // this.isLoggedIn = false,
    // this.authToken = null;

    // sets url's for dev/prod modes
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:3000/api';
    } else {
      this.baseUrl = 'api';
    }
  }

// ERROR HANDLING
  // not used yet, need to pipe errors into this function for each Http request
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

// TOKEN HANDLING

  // saves authentication token in local storage
  storeUserCreds(token){
    window.localStorage.setItem('userToken', token);
    console.log('here is your token: ', token)
    this.userCreds(token);
  }

  // sets credentials to local variables
  userCreds(token){
    this.isLoggedIn = true;
    this.authToken = token;
    console.log('userCreds authToken: ', this.authToken)
  }

  // loads user token from local storage
  loadUserCreds(){
    let token = window.localStorage.getItem('userToken');
    this.userCreds(token);
  }

  // gets rid of user credentials upon logout
  destroyUserCreds(){
    this.isLoggedIn = false;
    this.authToken = null;
    window.localStorage.clear();
  }

// USER FUNCTIONALITY

  // User Login functionality
  userLogin(user){
    let creds = `name=${user.name}&password=${user.password}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/login`, creds, { headers: headers }).subscribe((data) => {
        if(data.json().success) {
          // console.log('authentication token: ', data.json().token)
          this.storeUserCreds(data.json().token);
          resolve(true);
        } else {
          reject(data.json().msg);
        }
      });
    });
  }

  // Create new User functionality
  signUp(newUser){
    var creds = `name=${newUser.name}&password=${newUser.password}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/signup`, creds, { headers : headers }).subscribe((data) => {
        this.returnMessage = data.json().msg;
        if (data.json().success) {
          this.storeUserCreds(data.json().token)
          resolve(true);
        } else {
          console.log('error: ', this.returnMessage)
          reject(this.returnMessage);
        }
      });
    });
  }

  // Log out functionality
  logout() {
    this.destroyUserCreds();
  }

// Functionality for User's Routes (when logged in) //
  
  // Index for all Routes
  getRoutes(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log('authorization token: ', this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);
      
      this.http.get(`${this.baseUrl}/userroutes`, { headers : headers }).subscribe((data) => {
        if (data.json()) {
          resolve(data.json());
        } else {
          reject(false);
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
        if (data.json()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Post new user route
  saveNewRoute(routeToSave){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.loadUserCreds();
      console.log(this.authToken);
      headers.append('Authorization', `Bearer ${this.authToken}`);

      this.http.post(`${this.baseUrl}/userroutes`, routeToSave, { headers : headers }).subscribe((data) => {
        if (data.json()) {
          console.log(true);
          resolve(true);
        } else {
          console.log(false);
          reject(false);
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
        if (data.json()) {
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
        if (data.json()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
