import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { storage } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';





@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  report:any;
  reportcategoria:string;
  reportdescripcion:string;
  
  downloadedURL:string=""


  

  // configuraciones para que pueda usar la camara
  capturedSnapURL:string;
 
  cameraOptions: CameraOptions = {
    
    quality: 100,    
    destinationType: this.camera.DestinationType.DATA_URL,    
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor( private crudService:CrudService, private camera:Camera , private alertCtrl: AlertController) { }

  ngOnInit() {
    this.crudService.read_report().subscribe(data => {
 
      this.report = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          categoria: e.payload.doc.data()['categoria'],
          descripcion: e.payload.doc.data()['descripcion'],
          foto: e.payload.doc.data()['foto'],
         
        };
      })
      console.log(this.report);
 
    });
  }

  // metodo para tomar foto

  tomarFoto() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }

  

  CreateRecord() {
          // enviando la foto a firebase storage
          const filename = Math.floor(Date.now() / 1000);
          const pictures= storage().ref('pictures'+filename) ;
          pictures.putString(this.capturedSnapURL,'data_url') ;  
        
          storage().ref('gs://apk-leo.appspot.com/pictures1572962494').getDownloadURL().then(function(url) {
            console.log(url);

          this.downloadedURL = url;
          
          });






          
          


        
          let record = {};
          record['categoria'] = this.reportcategoria;
          record['descripcion'] = this.reportdescripcion;
          record['foto'] = this.downloadedURL;

        // enviando fotos a firebase storage
          
        
        
          this.crudService.create_report(record).then(resp => {
            this.reportcategoria = "";      
            this.reportdescripcion = "";
            this.downloadedURL="";
            console.log(resp);
            
          })
            .catch(error => {
              console.log(error);
            });
        }

        presentAlert() {
          let alert = this.alertCtrl.create({
            header:this.downloadedURL,
            buttons: ['Dismiss']
          });
           
        }

}
