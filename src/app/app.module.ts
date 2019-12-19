import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// configuramos la base de datos firestore y jalamos en key de firestore

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


// plugin para la autenticacion
import {AngularFireAuthModule} from '@angular/fire/auth';


// plugin para la camara

import { Camera } from '@ionic-native/camera/ngx';


// plugin para la geolocalizacion:
import { Geolocation } from '@ionic-native/geolocation/ngx';

// el plugin para los graficos:

import { ChartsModule } from 'ng2-charts';


//plugin para enviar los mensajes
import {SMS} from '@ionic-native/sms/ngx'


//plugin para el mensaje cloud
import { CallNumber } from '@ionic-native/call-number/ngx';

//plugin navegar con google maps

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


// plugin para el calendario
import { CalendarModule } from "ion2-calendar";


//plugin para usar la notificaciones 
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';







@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    // importamos los modulos para poder usarlos.
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule ,
    ChartsModule,
    AngularFireAuthModule,
    CalendarModule,
     ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    Camera,
    SMS,
    CallNumber,
    LaunchNavigator,
    LocalNotifications,
    
    
    
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
