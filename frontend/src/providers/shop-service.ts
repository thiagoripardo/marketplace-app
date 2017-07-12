import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shop } from '../domain/store/shop';

/*
  Generated class for the ShopService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

//let apiUrl = 'http://localhost:8080/';
let apiUrl = 'http://marketplace.4bantaxps2.us-west-2.elasticbeanstalk.com/';

@Injectable()
export class ShopService {

  public shops:Shop[] = [];
  public sh:Shop;

  constructor(public http: Http) {
    console.log('Hello ShopService Provider');
  }

  postOperation(data) {
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

  getAllShops() {
    /*return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Authorization', localStorage.getItem('token'));
      //console.log(localStorage.getItem('token'));
      this.http.get(apiUrl+'all/shops', {headers: headers})
        .subscribe(res => {
          //this.shops = res.json().itens;
          resolve(res.json());
            //console.log(res.json());
        }, (err) => {
          resolve(err);
        });
    });*/
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));
    return this.http
      .get(apiUrl+'all/shops', {headers: headers})
      .map(res => res.json().Items)
      .toPromise()
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          this.sh = new Shop(data[i].id, data[i].ownerid, data[i].info);
          this.shops.push(this.sh);
        }
        //console.log(this.shops);
        /*(let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
        this._usuarioLogado = usuario;*/
        return this.shops;
    });
  }

  getShopsFromOwner(data) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Authorization', localStorage.getItem('token'));
      //console.log(localStorage.getItem('token'));
      this.http.get(apiUrl+'/shops/'+data.ownerid, {headers: headers})
        .subscribe(res => {
            resolve(res.json());
            //console.log(res.json());
          }, (err) => {
            resolve(err);
          });
    })
  }

  getAShop(data) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Authorization', localStorage.getItem('token'));
      //console.log(localStorage.getItem('token'));
      this.http.get(apiUrl+'/shops/info/'+data.id, {headers: headers})
        .subscribe(res => {
            resolve(res.json());
            //console.log(res.json());
          }, (err) => {
            resolve(err);
          });
    })
  }

}