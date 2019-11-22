import { Component, OnInit } from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController,NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';


declare var google;



@Component({
  selector: 'app-zonasinseguras',
  templateUrl: './zonasinseguras.page.html',
  styleUrls: ['./zonasinseguras.page.scss'],
  
})
export class ZonasinsegurasPage implements OnInit {
  mapRef = null;
  direcciones:any=[];

  constructor(private geolocation:Geolocation,private loadingCtrl: LoadingController,private firestore: AngularFirestore, 
    private controller:AlertController, private navCtrl:NavController) { }


  ngOnInit(){
    this.obtenerData();
   
    
    
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
               
                 let latlng={lat:parseFloat(doc.data()['latitud']),lng:parseFloat(doc.data()['longitud']) }
                  this.direcciones.push({
                  position:latlng
                  
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
        


            var features = [
              {
                position: myLatLng,
                type: 'info'
              }
            ];   

      
          google.maps.event
          .addListenerOnce(this.mapRef, 'idle', () => {
          loading.dismiss();
          
          console.dir(this.direcciones)
          
              // Create markers.
            for (var i = 0; i < this.direcciones.length; i++) {
              var marker = new google.maps.Marker({
                position: this.direcciones[i].position,
                icon: "assets/img/alarma.png",
                map: this.mapRef
              });
            };

          
        });

      }).catch((err)=>{
        loading.dismiss();
        this.alertaubicacion();
      })
      
     
      
    
      
     
      
        

          
        
        
      
        
             

        
        
      

      
      
    

  



  }



 




 
}
