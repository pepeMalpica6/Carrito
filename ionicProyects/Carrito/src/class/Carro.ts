import { BluetoothSerial } from 'ionic-native';
import { ToastController } from 'ionic-angular';

export class Carro{
    luces: boolean;
    direccion: number; //10=>izq, 20=>der, 30=>centro
    velocidad: number; // 0-10
    constructor( ){ 
        this.luces       = false;
        this.direccion   = 30;
        this.velocidad   = 0;
     }



     velocidadControl(aceleracion: number){
         if( this.velocidad >= 0 && this.velocidad <= 10  ){
            this.velocidad = this.velocidad + aceleracion;
            console.log(this.velocidad);
         }
     }

     direccionControl(direccion: number){
        if(direccion == 10 && this.direccion == 30){
            //cambiar direccion a la izquierda
            this.direccion=10;
        }else if (direccion == 10 && this.direccion == 20 || direccion == 20 && this.direccion == 10){
            //cambiar al centro
            this.direccion=30;
        }else if (direccion == 20 && this.direccion == 30){
            //cambiar direccion a la derecha
            this.direccion=20;
        }
     }


    lucesControl(){
        if(this.luces == false){
            BluetoothSerial.write("A").then((data)=>{
            });
            this.luces = true;
            }else{
            BluetoothSerial.write("B").then((data)=>{
            });
            this.luces = false;
        }//if
    }

    temperatura(){
        BluetoothSerial.write("C").then((data)=>{
            BluetoothSerial.read().then((data)=>{
                return data;
            });
        });
        
         
        
    }
    
}