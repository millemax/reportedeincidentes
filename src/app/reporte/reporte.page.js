"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var firebase_1 = require("firebase");
var ReportePage = /** @class */ (function () {
    function ReportePage(crudService, camera, alertCtrl) {
        this.crudService = crudService;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.downloadedURL = "";
        this.cameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
    }
    ReportePage.prototype.ngOnInit = function () {
        var _this = this;
        this.crudService.read_report().subscribe(function (data) {
            _this.report = data.map(function (e) {
                return {
                    id: e.payload.doc.id,
                    isEdit: false,
                    categoria: e.payload.doc.data()['categoria'],
                    descripcion: e.payload.doc.data()['descripcion'],
                    foto: e.payload.doc.data()['foto']
                };
            });
            console.log(_this.report);
        });
    };
    // metodo para tomar foto
    ReportePage.prototype.tomarFoto = function () {
        var _this = this;
        this.camera.getPicture(this.cameraOptions).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.capturedSnapURL = base64Image;
        }, function (err) {
            console.log(err);
            // Handle error
        });
    };
    ReportePage.prototype.CreateRecord = function () {
        var _this = this;
        // enviando la foto a firebase storage
        var filename = Math.floor(Date.now() / 1000);
        var pictures = firebase_1.storage().ref('pictures' + filename);
        pictures.putString(this.capturedSnapURL, 'data_url');
        firebase_1.storage().ref('gs://apk-leo.appspot.com/pictures1572962494').getDownloadURL().then(function (url) {
            console.log(url);
            this.downloadedURL = url;
        });
        var record = {};
        record['categoria'] = this.reportcategoria;
        record['descripcion'] = this.reportdescripcion;
        record['foto'] = this.downloadedURL;
        // enviando fotos a firebase storage
        this.crudService.create_report(record).then(function (resp) {
            _this.reportcategoria = "";
            _this.reportdescripcion = "";
            _this.downloadedURL = "";
            console.log(resp);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    ReportePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            header: this.downloadedURL,
            buttons: ['Dismiss']
        });
    };
    ReportePage = __decorate([
        core_1.Component({
            selector: 'app-reporte',
            templateUrl: './reporte.page.html',
            styleUrls: ['./reporte.page.scss']
        })
    ], ReportePage);
    return ReportePage;
}());
exports.ReportePage = ReportePage;
