import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { BluetoothSerial, File, BackgroundMode } from 'ionic-native';
import { ToastController } from 'ionic-angular';

import { Carro } from '../../class/Carro'

declare var cordova: any;
const fs:string = cordova.file.externalRootDirectory;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Carro]
})


export class HomePage {

  temperatura: any;
  humedad: any;
  luminosidad: any;
  rapidez = 1;
  distancia: any;
  fileName="salida.txt";
  
  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public carro: Carro) {
                
                /*setInterval(()=> {
                  this.getValores();
                }, 5000); */
                

                //Si el archivo existe borra y creado
                //File.createFile(fs,this.fileName,true);
                //this.writeDocument("Hola txt");
                //this.writeDocument("Yo soy la linea 2??");
                
  }

  public toast(message){
    let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present();
  }


  public writeDocument( datos ){
    File.writeExistingFile(fs,this.fileName,datos)
      .then((data) => {
        let toast = this.toastCtrl.create({
          message: "Archivo creado?",
          duration: 3000
        });
        toast.present();
      }).catch((err) => {
        this.toast(err);
      });
    
  }

  public acelara(){
    //this.getValores();
    BluetoothSerial.write("D").then((data)=>{
    });
  }

  public frena(){
    //this.getValores();
    BluetoothSerial.write("E").then((data)=>{
    });
  }

  public izquierda(){
    //this.getValores();
    BluetoothSerial.write("G").then((data)=>{
    });
  }

  public derecha(){
    //this.getValores();
    BluetoothSerial.write("F").then((data)=>{
    });
  }

  public atras(){
    //this.getValores();
    BluetoothSerial.write("H").then((data)=>{
    });
  }

  public getValores(){
    this.rapidez = this.rapidez + 1;
    BluetoothSerial.write("C").then((data)=>{
            BluetoothSerial.readUntil('\n').then((data)=>{
                this.luminosidad = data;
            });
            BluetoothSerial.readUntil('\n').then((data)=>{
                this.temperatura = data;
            });
            BluetoothSerial.readUntil('\n').then((data)=>{
                this.humedad = data;
            });
            BluetoothSerial.readUntil('\n').then((data)=>{
                this.distancia = data;
            });
        });
  }

  public goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  public prenderLed(){
    BluetoothSerial.write("A").then((data)=>{
    });
  }

  public apagarLed(){
    BluetoothSerial.write("B").then((data)=>{
    });
  }
  
  public luces(){
    this.getValores();
  }

}
