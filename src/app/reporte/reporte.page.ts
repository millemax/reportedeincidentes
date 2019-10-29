import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  report:any;
  reportcategoria:string;
  reportdescripcion:string;
  //reportfoto:string;

  constructor( private crudService:CrudService) { }

  ngOnInit() {
    this.crudService.read_report().subscribe(data => {
 
      this.report = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          categoria: e.payload.doc.data()['categoria'],
          descripcion: e.payload.doc.data()['descripcion'],
         
        };
      })
      console.log(this.report);
 
    });
  }

  CreateRecord() {
    let record = {};
    record['categoria'] = this.reportcategoria;
    record['descripcion'] = this.reportdescripcion;
  
    this.crudService.create_report(record).then(resp => {
      this.reportcategoria = "";
     // this.studentAge = undefined;
      this.reportdescripcion = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

}
