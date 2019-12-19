import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private autenticador:AngularFireAuth, private navCtrl:NavController) { }

  ngOnInit() {
  }

  logOut(){
     this.autenticador.auth.signOut()
     .then(()=>{
       this.navCtrl.navigateForward("/home");

     })
     
    
  }

}
