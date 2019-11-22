import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AlertController,NavController,LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre:string;
  apellido:string;
  dni:number;
  numerocelular:number;
  correo:string;
  contrasena:string;
  ccontrasena:string;

  


  constructor( private autenticador:AngularFireAuth,private controller: AlertController,private navCtrl:NavController,
    private loadingCtrl: LoadingController) { }

//modal de alerta que indica si esta listo la peticion

handleButtonClick() {
  this.controller.create({
    header: 'Usuario Registrado',
    message: 'Gracias por pertenecer a Alerta Andahuaylas',
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

// modal de error que salta cuando existe un error en el registro

error(){
        this.controller.create({
          header: 'Error',
          message: '¡Las contraseñas no coinciden!',
          buttons: ['Ok']
            
          
        }).then(alert => {
          alert.present();
        });
}






  // funcion que registra a los usuarios en firebase
  async registro(){
    const loading = await this.loadingCtrl.create();
      loading.present();
    
    var db = firebase.firestore();
          if(this.contrasena!= this.ccontrasena){
            
            console.log("las contraseñas no coinciden")
            loading.dismiss();
            this.error();

          }
          else{

                  try {
                    this.autenticador.auth.createUserWithEmailAndPassword(this.correo,this.contrasena)
                      .then((result:any)=>{
                        
                          db.collection("users").doc(""+this.autenticador.auth.currentUser.uid).set({
                          nombre:this.nombre,
                          apellido:this.apellido,
                          dni:this.dni,
                          numerocelular:this.numerocelular,
                          correo:this.correo,

                        })         
                        console.log("usuario registrado");
                        loading.dismiss();
                        this.handleButtonClick();       

                      })
                      .catch((err:any)=>console.log("error al registrarse"))                     
                      
                    
                    
                  } catch (error) {
                    console.dir(error)
                    
                  }
            
          }
    

  }

  ngOnInit() {
  }

  

}
