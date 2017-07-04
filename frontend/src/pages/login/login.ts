import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service';
import { Http, Headers, Response, RequestOptions, CookieXSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email = 'uniquest@uniquest.com'; 
  public password = '57n92s';
  public isAuthenticated: boolean = false;
  public result;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _service: UsuarioService, 
    private _alertCtrl: AlertController,
    public http: Http) {}
  efetuaLogin() {

    /*this._service
      .efetuaLogin(this.email, this.senha)
      .then(usuario => {
        console.log(usuario);
        this.navCtrl.setRoot(HomePage)
      })
      .catch(() => {
        this._alertCtrl.create({
          title: 'Problema no login',
          subTitle: 'Email ou senha inválidos. Verifique',
          buttons: [{ text: 'Ok'}]
        }).present();
      });*/

    
 
    let postParams = {

      email: 'uniquest@uniquest.com',
      password: '57n92s'

    };
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append('Cookie', '' );
    let options = new RequestOptions({ headers: headers});
    
    this.http.post("http://uniquest.pqv2emwpjw.us-west-2.elasticbeanstalk.com/login", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error getting the data
      });
  }
}
