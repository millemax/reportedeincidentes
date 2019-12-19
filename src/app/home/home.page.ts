import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { NavController,AlertController,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  correo:string;
  contrasena:string;

  constructor(private autenticador:AngularFireAuth, private navCtrl:NavController,
    private controller: AlertController,private loadingCtrl: LoadingController) {}
 
 // alerta en caso de que el usuario reciba un error
 usuarioError(){
  this.controller.create({
    header: 'Notificacion',
    message: 'Correo o contraseña son incorrectos',
    buttons: ['Ok']
  }).then(alert => {
    alert.present();
  });


 }



 async login(){
  const loading = await this.loadingCtrl.create();
  loading.present();
   if(this.correo==null || this.contrasena==null){
        this.usuarioError();
        loading.dismiss();
        console.log("vacio")

         
        }else{
           
          
            this.autenticador.auth.signInWithEmailAndPassword(this.correo,this.contrasena)
            .then((res:any)=>{
              console.log("usuario autenticado");
              loading.dismiss();
              this.navCtrl.navigateForward('/menu');
              this.correo="";
              this.contrasena="";
            }
            

            )
            .catch((err:any)=>{
              loading.dismiss();
              this.usuarioError();
              this.correo="";
              this.contrasena="";
            });




        }


      }

 // funcion para reestablecer contraseña
      reestablecercontrasena(){
        console.log("reestableciendo contraseña");
        this.navCtrl.navigateForward('/recontrasena');
      }
    

}
