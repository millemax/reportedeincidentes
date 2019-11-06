"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CrudService = /** @class */ (function () {
    function CrudService(firestore) {
        this.firestore = firestore;
    }
    // crearemos nuestro nuevo documento
    CrudService.prototype.create_report = function (record) {
        return this.firestore.collection('reportes').add(record);
    };
    // leeremos nuestros documentos existentes
    CrudService.prototype.read_report = function () {
        return this.firestore.collection('reportes').snapshotChanges();
    };
    // actualizaremos nuestros documentos existentes
    CrudService.prototype.update_report = function (recordID, record) {
        this.firestore.doc('reportes/' + recordID).update(record);
    };
    // borraremos nuestros documentos
    CrudService.prototype.delete_report = function (record_id) {
        this.firestore.doc('reportes/' + record_id)["delete"]();
    };
    CrudService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CrudService);
    return CrudService;
}());
exports.CrudService = CrudService;
