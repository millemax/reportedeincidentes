import { Component, OnInit } from '@angular/core';7

// Importamos en el servicio de crud 

import {CrudService}  from '../services/crud.service';
import {LoadingController, AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


// importamos el plugin para enviar las notificaciones
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

 




export interface Tarea {
  categoria: string;
  descripcion: string;
  foto:string;
  latitud:number;
  longitud:number;
  

}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  entro:any=false;

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];

   coleccionDatos:any=[{
     id:"",
     data:{} as Tarea
   }];

   categoria:string;

   

  constructor( private firestoreService:CrudService,private loadingCtrl: LoadingController,
    private callNumber: CallNumber, private launchNavigator:LaunchNavigator, private controller:AlertController,private autenticador:AngularFireAuth,
    private localNotifications: LocalNotifications) { 
    this.obtenerListaTareas().then(err=>{
          console.log("obtuve un nuevo dato ");
    })
  }

  ngOnInit() {
        
  }
  

  //funcion para enviar las notificaciones
  notificacion(){
    if (this.entro==true) {
      console.log('hola')
      this.localNotifications.schedule({
        id: 1,
        text: 'tienes nuevas alertas',
        sound: 'file://assets/sound/alert.mp3',
        data: { secret: 'key_data' }
      });    
      
    }  

  }


  async obtenerListaTareas(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.firestoreService.read_report().subscribe((resultadoConsultaTareas) => {
      loading.dismiss();
      this.notificacion();
      this.entro=true;
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
          
          
        });
        
       // console.log(this.arrayColeccionTareas)
       this.coleccionDatos= this.arrayColeccionTareas.reverse();  
       console.log(this.arrayColeccionTareas)
       
        
      })
    });


  
    


  }

  alerta(){

    this.controller.create({
      header: 'Notificación',
      message: 'No estas autorizado!',
      buttons: ['Ok']
    }).then(alert => {
      alert.present();
    });

  }


  async callNow(iud:string){
    const loading = await this.loadingCtrl.create();
    loading.present();
    let adiud=this.autenticador.auth.currentUser.uid
    
    
   if (adiud=="S3NQO5aKJ8gPT0BUTkhO0oDTmqJ2") {
          var db = firebase.firestore();
                  
          db.collection('users').doc(iud).get()
            .then((querySnapshot)=>{
                    loading.dismiss();
                    let num=querySnapshot.data()['numerocelular'];
                    this.callNumber.callNumber(""+num, true)
                      .then(res => console.log('Launched dialer!', res))
                      .catch(err => console.log('Error launching dialer', err));

            })
            .catch((err)=>{
              console.log("no se pudo obtener el telefono celular")
            })
     
   } else {
     loading.dismiss();
     this.alerta();


     
   }
            

      
      
  }


  navlauncher(lat:number,lng:number){
 

      this.launchNavigator.navigate([lat,lng])
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );


  }


 
  





}
