import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController,NavController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { SMS,SmsOptions } from '@ionic-native/sms/ngx';



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  report:any;
  reportcategoria:string;
  reportdescripcion:string;
  
  


  

  // configuraciones para que pueda usar la camara
  capturedSnapURL:string;

  // varibles para almacenar lat,lng
  lat:number;
  lng:number;
 
  fecha: any;
  hora:any;
  filename:any;
  urlFoto:any;
  
    
  

  

  




 
  cameraOptions: CameraOptions = {
    
    quality: 100,
    targetWidth:200,
    targetHeight:400,    
    destinationType: this.camera.DestinationType.DATA_URL,    
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  constructor( private crudService:CrudService, private camera:Camera ,
     private alertCtrl: AlertController,private geolocation: Geolocation, private loadingCtrl: LoadingController,
     private autenticador:AngularFireAuth,private navCtrl:NavController,private controller: AlertController,private sms: SMS) { 

     }

  ngOnInit() {
    
    this.crudService.read_report().subscribe(data => {
 
      this.report = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          categoria: e.payload.doc.data()['categoria'],
          descripcion: e.payload.doc.data()['descripcion'],
          foto: e.payload.doc.data()['foto'],
          latitud: e.payload.doc.data()['latitud'],
          longitud: e.payload.doc.data()['longitud'],
          fecha: e.payload.doc.data()['fecha'],
          hora: e.payload.doc.data()['hora'],
         
        };
      })
      console.log(this.report);
 
    });

    // ejecuciones que tienen que iniciar antes

    this.obtenerUbicacion();
    
    
    
 
  }


//obtener la url de imagen




// esta alerta se activa cuando los datos han sido enviados.
alerta(){

    this.controller.create({
      header: 'Notificación',
      message: 'El reporte a sido enviado con ¡exito!',
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

  alertaubicacion(){
    this.controller.create({
      header: 'Notificación',
      message: 'Activar ubicacion GPS',
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

  // este es la funcion para poder obtener fecha  y la hora actual
  obtenerFecha(){

    var hoy= new Date();
    this.fecha= hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
    this.hora=hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();


  }

  // obtenemos nuestra ubicacion.

  obtenerUbicacion(){

    // copturar los datos del gps

    this.geolocation.getCurrentPosition().then((resp) => {

      
       this.lat= resp.coords.latitude,
       this.lng= resp.coords.longitude

            
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });




}

  // metodo para tomar foto

  tomarFoto() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;

      

    }, (err) => {
      
      console.log(err);
      
    });

    
  }

  cargarFoto(){
    // cargando al imagen a la base de datos:
    const filename = Math.floor(Date.now() / 1000);
    var nameImage='pictures'+filename;
    const pictures= storage().ref(nameImage);
     pictures.putString(this.capturedSnapURL,'data_url')
     .then((resp)=>{
       this.getUrl(nameImage);
     })


  }


  getUrl(nameImage:any){
 
    var storage = firebase.storage();
    var storageRef=storage.ref();
    storageRef.child(nameImage).getDownloadURL()
      .then((resp:any)=>{
          console.log(resp);
          this.urlFoto=resp;
      })
      .catch((err)=>{
        console.log("error al obtener","=>",err);
      })
    
  }



 
  



  async CreateRecord() {      

                  
          const loading =  await this.loadingCtrl.create();
          loading.present();
          
          //this.cargarFoto();
          this.obtenerFecha();

          //prueba cargar foto y obtener url
          // cargando al imagen a la base de datos:

              const filename = Math.floor(Date.now() / 1000);
              var nameImage='pictures'+filename;
              const pictures= storage().ref(nameImage);
              pictures.putString(this.capturedSnapURL,'data_url')
                  .then((resp)=>{

                        var storage = firebase.storage();
                        var storageRef=storage.ref();
                        storageRef.child(nameImage).getDownloadURL()
                          .then((resp:any)=>{
                              console.log(resp);
                              this.urlFoto=resp;
                              this.cargar();
                              loading.dismiss();
                          })
                          .catch((err)=>{
                            console.log("error al obtener","=>",err);
                          })
                    

                  })


    }




        
   
  
        
  async cargar(){
    let hoy=Date.now();
    const loading =  await this.loadingCtrl.create();
    loading.present();

    if(this.lat==null || this.lng ==null){
             this.alertaubicacion();
             loading.dismiss();

              
              }


              else{
                
                //fin de prueba foto y url
                    
                let record = {};
                record['iud']=""+this.autenticador.auth.currentUser.uid;
                record['categoria'] = this.reportcategoria;
                record['descripcion'] = this.reportdescripcion;
                record['foto'] =""+this.urlFoto;
                record['latitud'] =this.lat;
                record['longitud'] =this.lng;
                record['fecha']=this.fecha;
                record['hora']=this.hora;
                record['tiempo']=hoy;



              // enviando los datos a firestore         
              
                this.crudService.create_report(record).then(resp => {
                  //this.sendsms();
                  this.reportcategoria ="";      
                  this.reportdescripcion ="";
                  this.capturedSnapURL="";
                  this.lat=null;
                  this.lng=null;
                  this.fecha="";
                  this.hora="";
                  hoy=null;
                  loading.dismiss();
                  console.log(resp);
                  this.alerta();
                  
                  
                  
                })
                  .catch(error => {
                    console.log(error);
                  });




              }
      }
  
 
  
 }








