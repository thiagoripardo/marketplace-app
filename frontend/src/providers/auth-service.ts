import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://marketplace.4bantaxps2.us-west-2.elasticbeanstalk.com/';
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
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));
    return this.http
      .get(apiUrl+'dashboard', {headers: headers})
      .map(res => res.json())
      .toPromise()
      .then(data => {
        //console.log(data);
        return data;
    });
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