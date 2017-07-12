import { ItemService } from './../../providers/item-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the ItemRegistration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-registration',
  templateUrl: 'item-registration.html'
})
export class ItemRegistrationPage {

  loading: any;
  regData = {ownerstore:'',info:{name:'',description :'',price:''},action:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public itemService: ItemService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemRegistrationPage');
  }

  doRegisterItem(){
    this.showLoader();
     this.regData.action = "add";
    this.itemService.postOperation(this.regData).then((result) => {
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
