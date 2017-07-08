import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;

  constructor(public app: App, 
    public navCtrl: NavController, 
    public authService: AuthService, 
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    private _alertCtrl: AlertController) {
      if(localStorage.getItem("token")) {
        this.isLoggedIn = true;
      }
  }

  logout() {
    this.logoutLoader();
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
    this.loading.dismiss();
  }
  
  getinfo() {
    this.showLoader();
    this.authService.getinfo().then((result) => {
      this.loading.dismiss();
      //console.log(result);

      this._alertCtrl.create({
              title: 'Envio',
              subTitle: JSON.stringify(result),
              buttons: [{ text: 'Ok'}]
            }).present()

      this.presentToast(result);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

    /*getinfo() {
      this.showLoader();
      this.authService.getinfo().then(data => {
        this.loading.dismiss();
        this.presentToast(data);
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });                                 
    }*/
  /*logout() {
    this.logoutLoader();
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
    this.loading.dismiss();
  }*/

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  logoutLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Logout...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}