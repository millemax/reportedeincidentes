import { Component } from '@angular/core';



import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Menu",
        url   : "/menu",
        icon  : "grid"
      },
      {
        title : "Acerca",
        url   : "/menu",
        icon  : "grid"
      },
      {
        title : "Cerrar Sesion",
        url   : "/home",
        icon  : "log-out"
      },
    ]
  }


}
