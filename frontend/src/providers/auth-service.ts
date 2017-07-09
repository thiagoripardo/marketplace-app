import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8080/';
//let apiUrl = 'http://uniquest.pqv2emwpjw.us-west-2.elasticbeanstalk.com/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'register', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  getinfo() {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Authorization', localStorage.getItem('token'));
      //console.log(localStorage.getItem('token'));
      this.http.get(apiUrl+'dashboard', {headers: headers})
        .subscribe(res => {
            resolve(res.json());
            //console.log(res.json());
          }, (err) => {
            resolve(err);
          });
    })
  }

  logout(){
    localStorage.clear();
  }

  /*logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }*/

}