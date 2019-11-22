import { Component, OnInit } from '@angular/core';7

// Importamos en el servicio de crud 

import {CrudService}  from '../services/crud.service';
import {LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';


 




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
   }]

  constructor( private firestoreService:CrudService,private loadingCtrl: LoadingController,private callNumber: CallNumber) { 
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


  callNow(number){

    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      
  }


 
  





}
