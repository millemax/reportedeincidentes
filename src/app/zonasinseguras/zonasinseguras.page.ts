import { Component, OnInit } from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController,NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';


declare var google;



@Component({
  selector: 'app-zonasinseguras',
  templateUrl: './zonasinseguras.page.html',
  styleUrls: ['./zonasinseguras.page.scss'],
  
})
export class ZonasinsegurasPage implements OnInit {
  mapRef = null;
  direcciones:any=[];
  desde:number;
  hasta:number;

  
  

  constructor(private geolocation:Geolocation,private loadingCtrl: LoadingController,private firestore: AngularFirestore, 
    private controller:AlertController, private navCtrl:NavController,public modalCtrl: ModalController) { }

   
  

  ngOnInit(){
    this.obtenerData();
   
    
    
  }

// abre el calendario y recibe el dato

 async openCalendar() {
        var hoy=Date.now();
        const options: CalendarModalOptions = {
          canBackwardsSelected: true,
          pickMode: 'range',
          title: 'RANGE',
          to: hoy
        
        };
      
        const myCalendar = await this.modalCtrl.create({
          component: CalendarModal,
          componentProps: { options }
        });
      
        myCalendar.present();
      
        const event: any = await myCalendar.onDidDismiss();
        const date = event.data;
        const from: CalendarResult = date.from;
        const to: CalendarResult = date.to;
        this.data(from['time'],to['time']);
        console.log(date, from, to);
}

// obtenemos los datos personalizados de firebase ordenados por calendar
 async data(desde:number,hasta:number){
   this.direcciones=[];
   
  const loading = await this.loadingCtrl.create();
      loading.present();

      //obtenemos la ubicacion de las posiciones guardadas
      var db = firebase.firestore();
      db.collection('reportes').where("tiempo",">=",desde).where("tiempo","<=",hasta).get()
        .then((resp)=>{
             

              resp.forEach((doc:any)=>{
               
                 let latlng={lat:parseFloat(doc.data()['latitud']),lng:parseFloat(doc.data()['longitud']) };
                 let tipos=doc.data()['categoria'];
                  this.direcciones.push({
                  position:latlng,
                  type:tipos

                  
                });

              });
          loading.dismiss();
            
         
           this.loadMap()
              

        })
        .catch((err)=>{
          console.log(err)

        })




}



  alertaubicacion(){
    this.controller.create({
      header: 'Notificación',
      message: 'Tuvimos algunos problemas quizas debas Activar tu GPS',
      buttons: [
        {
          text:'ok',
          handler:()=>{
            //regresamos al login 
            this.navCtrl.navigateBack('/menu')
           
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });



  }


 async obtenerData(){
    const loading = await this.loadingCtrl.create();
      loading.present();

      //obtenemos la ubicacion de las posiciones guardadas
      var db = firebase.firestore();
      db.collection('reportes').get()
        .then((resp)=>{
             

              resp.forEach((doc:any)=>{
               
                 let latlng={lat:parseFloat(doc.data()['latitud']),lng:parseFloat(doc.data()['longitud']) };
                 let tipos=doc.data()['categoria'];
                  this.direcciones.push({
                  position:latlng,
                  type:tipos

                  
                });

              });
          loading.dismiss();
            
          this.loadMap();
              

        })
        .catch((err)=>{
          console.log(err)

        })


    //fin de la ubicaciones guardadas

      
  }


  async loadMap(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    
    const mapEle: HTMLElement = document.getElementById('map');
    
      
      this.geolocation.getCurrentPosition().then((rta)=>{
        const myLatLng={
          lat: rta.coords.latitude,
          lng: rta.coords.longitude}


          this.mapRef = new google.maps.Map(
            document.getElementById('map'),
            {center: myLatLng, zoom: 16});    
        
            
             

      
          google.maps.event
          .addListenerOnce(this.mapRef, 'idle', () => {
          loading.dismiss();

          //llamamos a la funcion de marker
          this.addMarker(this.direcciones);
          
         

          
        });

      }).catch((err)=>{
        loading.dismiss();
        this.alertaubicacion();
      })
      
         
  }
  
  
 addMarker(lista:[{position:any,type:any}]){

          var icons = {
            Robo: {
              icon: "assets/img/Robo.png"
            },
            Asalto: {
              icon: "assets/img/Asalto.png"
            },
            Pelea: {
              icon: "assets/img/Pelea.png"
            },
            Violencia: {
              icon: "assets/img/Violencia.png"
            },
            Incendio: {
              icon: "assets/img/Incendio.png"
            },
            Otros: {
              icon: "assets/img/alarma.png"
            },
            
          };


          console.dir(lista)
          
          // Create markers.
        for (var i = 0; i < lista.length; i++) {
          var marker = new google.maps.Marker({
            position: lista[i].position,
            icon: icons[lista[i].type].icon,
            map: this.mapRef
          });
        };




   }  

        
      
}
      
      
    

  



  



 




 

