import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import {NavController,LoadingController,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-recontrasena',
  templateUrl: './recontrasena.page.html',
  styleUrls: ['./recontrasena.page.scss'],
})
export class RecontrasenaPage implements OnInit {

  correo:string;

  constructor(private autenticador:AngularFireAuth,private navCtrl:NavController,private loadingCtrl: LoadingController, private controller: AlertController) { }

  ngOnInit() {
  }

  //funcion que se ejecuta para las alertas 
  handleButtonClick(alerta:string,mensaje:string,ruta:string) {
    this.controller.create({
      header: alerta,
      message: mensaje,
      buttons: [
        {
          text:'ok',
          handler:()=>{
            //regresamos al login 
            this.navCtrl.navigateBack(ruta);
           
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  

  async restablecer(){
    //arranca el loading esperado que se cumpla la funcion
    const loading = await this.loadingCtrl.create();
    loading.present();

    //se envia el correo para reestablecer
    console.log("enviando correo para reestablecer");
    console.log(this.correo);
    this.autenticador.auth.sendPasswordResetEmail(this.correo)
              .then((res)=>{
                console.log("mensaje enviado exitosa");
                this.correo="";
                loading.dismiss();
                this.handleButtonClick('OK correo enviado','revise en su bandeja de entrada o spams','/home')
              })
              .catch((err)=>{
                console.log("error al enviar correo");
                loading.dismiss();
                this.handleButtonClick('ERROR','no pudimos enviar el correo ','/home');

              })


  }

}