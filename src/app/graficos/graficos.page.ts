import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import {LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {
  mes:number;
  mesNombre:string;
  

  
  num=[];
  Estadisticos:any=[];

  

  

  constructor( private firestore: AngularFirestore,private loadingCtrl: LoadingController) {
    
   }

  ngOnInit() {
    this.secuencia();
    this.obtenerFecha();
    
  }

  async secuencia(){

    var primero= await this.obtenerDatos();
   
  }

  obtenerFecha(){
    var hoy= new Date();
    const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre",]
    this.mes=hoy.getMonth()

    

    this.mesNombre=meses[this.mes]

    console.log(this.mes,this.mesNombre);


  }


  // hago la consulta a base de datos y  las cateogrias y la cantidad que tiene cada uno.
  async obtenerDatos(){

          // loading control,carga hasta que reciba todos los datos y desaparece
          const loading = await this.loadingCtrl.create();
          loading.present();

          //hace un referencia
          var db = firebase.firestore();
      

          const categorias=["Robo","Asalto","Pelea callejera","Violencia familiar","Incendio","Otros"]

         

        //hacemos un for buscando las categorias y los almacenamos en una array para poder usarlo para dibujar los graficos
  
        for(var i=0;i<categorias.length;i++){
                  
                  db.collection("reportes").where("categoria", "==",categorias[i])
                    .get()
                    .then((resp)=>{
                            this.num=[];
                            loading.dismiss();
                            
                            resp.forEach((doc:any)=>{

                              this.num.push(
                                doc.data()['categoria']
                              )

                              
                              
                            });  
                            this.calcular(this.num)                  
                          
                      
                    })
                    
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });   

                
                    
                  
                    

          }  

    
 
    

} 

// obtengo en un array la cantidad que tiene en cada categoria
calcular(num:any=[]){
        console.dir(num.length);
        this.Estadisticos.push(
          num.length
        )

        if(this.Estadisticos.length>=6){
          this.barChart();
          this.showChart();
          
          
        }
    

}


//dibujo la tabla estadistico  

showChart() {
    
    
    var ctx = (<any>document.getElementById('pie-chart')).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ["Robo","Asalto","Pelea callejera","Violencia Familiar","Incendio","Otros"],
        datasets: [{
              label:this.mesNombre,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              
              data: this.Estadisticos,
              borderWidth: 1
        }]
       }
    });
  }




//dibujo el cuadro estadistico de forma torta
  barChart(){
    console.log("tercero")
    var ctx = (<any>document.getElementById('bar-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      // aca especifico el tipo: pie,bar,line 
        type: 'pie',
        data: {
        labels: ["Robo","Asalto","Pelea callejera","Violencia Familiar","Incendio","Otros"],
        datasets: [{
              label: ""+ this.mes,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              data:this.Estadisticos,
              borderWidth: 1
        }]
       }
    });
    
  }


 
    
    
    


}
