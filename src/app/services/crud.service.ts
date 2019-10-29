import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 // crearemos nuestro nuevo documento
  create_report(record) {
    return this.firestore.collection('reportes').add(record);
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
 
