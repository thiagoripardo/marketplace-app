import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  public userData = { message : '', user : '' };
  //public userData;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _service: AuthService) {}


  ionViewDidLoad() {

    this._service.getinfo().then((result) => {
      //this.loading.dismiss();
      this.userData.message = result.message;
      this.userData.user = result.user;
      //console.log(this.shops);
    }, (err) => {
      //this.loading.dismiss();
      //this.presentToast(err);
    });
  }

  /*ionViewDidLoad() {
    
    this.userData = this._service.getinfo();
    console.log(this._service.getinfo());
  } */

  userLogged() {
    return this._service.getinfo();
  }
}