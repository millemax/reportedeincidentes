import { Component, OnInit } from '@angular/core';7

// Importamos en el servicio de crud 

import {CrudService}  from '../services/crud.service';
import {LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

import * as firebase from 'firebase';

 




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

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];

   coleccionDatos:any=[{
     id:"",
     data:{} as Tarea
   }];

   categoria:string

  constructor( private firestoreService:CrudService,private loadingCtrl: LoadingController,
    private callNumber: CallNumber, private launchNavigator:LaunchNavigator) { 
    this.obtenerListaTareas();
  }

  ngOnInit() {


    
  }

  async obtenerListaTareas(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.firestoreService.read_report().subscribe((resultadoConsultaTareas) => {
      loading.dismiss();
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

  imprimir(descripcion:string){
    console.log(descripcion)

  }


  callNow(iud:string){
  
    var db = firebase.firestore();
    
    db.collection('users').doc(iud).get()
      .then((querySnapshot)=>{
               let num=querySnapshot.data()['numerocelular'];
               this.callNumber.callNumber(""+num, true)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => console.log('Error launching dialer', err));

      })
      .catch((err)=>{
        console.log("no se pudo obtener el telefono celular")
      })

      
      
  }


  navlauncher(lat:number,lng:number){
 

      this.launchNavigator.navigate([lat,lng])
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );


  }


 
  





}
