import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  idtime:number;
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 // crearemos nuestro nuevo documento
  create_report(record) {
    this.idtime=Date.now();
    return this.firestore.collection('reportes').doc(""+this.idtime).set(record);
  }
 // leeremos nuestros documentos existentes
  read_report() {
    return this.firestore.collection('reportes').snapshotChanges();
  }
 // actualizaremos nuestros documentos existentes
  update_report(recordID,record){
    this.firestore.doc('reportes/' + recordID).update(record);
  }
  // borraremos nuestros documentos
 
  delete_report(record_id) {
    this.firestore.doc('reportes/' + record_id).delete();
  }
}
 
