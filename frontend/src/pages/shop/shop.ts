import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Shop } from '../../domain/store/shop';
import { Item } from '../../domain/store/item';
import { ItemPage } from '../item/item';
import { ItemService } from '../../providers/item-service';

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  
  loading: any;
  isLoggedIn: boolean = false;
  public items : Item[] = [];
  public item;
  public shop;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    private _alertCtrl: AlertController,
    public itemService: ItemService) {
    
  }

  ngOnInit() {
    this.initLoader();
    this.shop = this.navParams.get('shopSelect');
    this.itemService.getItemsFromOwner(this.shop.id).then((result) => {
      this.loading.dismiss();
      this.items = result;
      //console.log(this.shops);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  initLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading Items...'
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

  selectItem(item){
    this.navCtrl.push(ItemPage, { itemSelect: item } );
  }

}