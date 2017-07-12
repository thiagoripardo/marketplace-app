import { UserShopPage } from './../user-shop/user-shop';
import { ShopService } from './../../providers/shop-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the ShopRegistration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop-registration',
  templateUrl: 'shop-registration.html'
})
export class ShopRegistrationPage {

  loading: any;
  regData = {ownerid:'', info:{name:'', phone:'', address:''}, action:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public shopService: ShopService, private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopRegistrationPage');
  }

  doRegisterShop(){
    this.showLoader();
    this.regData.action = "add";
    this.shopService.postOperation(this.regData).then((result) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    }, (err) =>{
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Registering...'
    })
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
