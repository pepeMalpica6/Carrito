import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

import { BluetoothSerial } from 'ionic-native';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [
    BluetoothSerial
  ]
})
export class SettingsPage {

  public working:string;
  public var2: string ;
  public lists = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform,
              public toastCtrl: ToastController,
              public bluetoothSerial: BluetoothSerial) {
        platform.ready().then(() => {
          this.buscarDispositivos();
        });
  }

  conectarBtl(id){
    BluetoothSerial.connect(id).subscribe((data)=>{
      let toast = this.toastCtrl.create({
        message: "Conexion exitosa!",
        duration: 3000
      });
      toast.present();
      this.navCtrl.popTo(HomePage);
      //this.navCtrl.push(HomePage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  buscarDispositivos(){
        // async so keep everything in this method
    BluetoothSerial.isEnabled().then((data)=> {
        // not sure of returning value, probably a boolean
        console.log("dont know what it returns"+data);

        // returns all the available devices, not just the unpaired ones
        BluetoothSerial.list().then((allDevices) => {
            // set the list to returned value
            this.lists = allDevices;            
        });
    });
   
  }


}
