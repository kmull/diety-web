"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ELEMENT_DATA = exports.TabelaJadlospisComponent = void 0;
var dieta_zapis_1 = require("./../../../models/dieta-zapis");
var core_1 = require("@angular/core");
var dni_tygodnia_enum_1 = require("../../../models/enums/dni-tygodnia-enum");
var operators_1 = require("rxjs/operators");
var dania_all_1 = require("./../../../models/dania-all");
var zapisz_modal_component_1 = require("./zapisz-modal/zapisz-modal.component");
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as autoTable from 'jspdf-autotable';
var TabelaJadlospisComponent = /** @class */ (function () {
    function TabelaJadlospisComponent(posilekService, 
    // private mealDinnerService: MealDinnerService,
    dietaService, dialog) {
        this.posilekService = posilekService;
        this.dietaService = dietaService;
        this.dialog = dialog;
        this.outRecord = new core_1.EventEmitter();
        this.outDania = new core_1.EventEmitter();
        this.outSecondBreakfast = new core_1.EventEmitter();
        this.outAfternoonSnack = new core_1.EventEmitter();
        this.displayedColumns = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
        this.dataSource = exports.ELEMENT_DATA;
        this.dzien = dni_tygodnia_enum_1.DniTygodniaEnum.PONIEDZIALEK;
        this.isSecondBreakfast = false;
        this.isAfternoonSnack = false;
        this.tableOptions();
    }
    TabelaJadlospisComponent.prototype.ngOnDestroy = function () {
        this.posilekService.setDanie(null, null);
        this.subskrypcja$.unsubscribe();
    };
    TabelaJadlospisComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('dataSource', this.dataSource);
        this.dieta = new dieta_zapis_1.DietaZapis();
        this.dania = [
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.PONIEDZIALEK),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.WTOREK),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.SRODA),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.CZWARTEK),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.PIATEK),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.SOBOTA),
            new dania_all_1.DaniaAll(dni_tygodnia_enum_1.DniTygodniaEnum.NIEDZIELA)
        ];
        this.subskrypcja$ = this.posilekService.getDanie()
            .pipe(operators_1.tap(function (danie) {
            if (!!danie && !!danie.rodzajDania && !!danie.danie) {
                var index = exports.ELEMENT_DATA.findIndex(function (i) { return i.dzien === _this.dzien; });
                _this.dania[index][danie.rodzajDania] = danie.danie;
                console.log('this.dania', _this.dania);
                exports.ELEMENT_DATA[index][danie.rodzajDania] = _this.mapDanie(danie.danie);
                _this.dataSource = exports.ELEMENT_DATA;
                exports.ELEMENT_DATA.filter(function (osoba) { return osoba !== 'kasia'; });
            }
        }))
            .subscribe();
    };
    TabelaJadlospisComponent.prototype.mapDanie = function (danie) {
        console.log('danie', danie);
        var wynik = '';
        for (var _i = 0, _a = Object.keys(danie); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'dzien' || !danie[key]) {
                continue;
            }
            wynik += danie[key] + ', ';
        }
        return wynik;
    };
    TabelaJadlospisComponent.prototype.rowSelected = function (row) {
        var index = this.dania.findIndex(function (i) { return i.dzien === row.dzien; });
        this.selectedDanie = this.dania[index];
        this.outDania.emit(this.selectedDanie);
        this.dzien = row.dzien;
        this.selectedRowIndex = row.dzien;
        this.outRecord.emit(row.dzien);
    };
    TabelaJadlospisComponent.prototype.isSecondBreakfastChange = function () {
        this.isSecondBreakfast = !this.isSecondBreakfast;
        this.outSecondBreakfast.emit(this.isSecondBreakfast);
        this.tableOptions();
    };
    TabelaJadlospisComponent.prototype.isAfternoonSnackChange = function () {
        this.isAfternoonSnack = !this.isAfternoonSnack;
        this.outAfternoonSnack.emit(this.isAfternoonSnack);
        this.tableOptions();
    };
    TabelaJadlospisComponent.prototype.tableOptions = function () {
        if (this.isAfternoonSnack && this.isSecondBreakfast) {
            this.displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'podwieczorek', 'kolacja'];
        }
        else if (this.isAfternoonSnack) {
            this.displayedColumns = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja'];
        }
        else if (this.isSecondBreakfast) {
            this.displayedColumns = ['dzien', 'sniadanie', 'drugieSniadanie', 'obiad', 'kolacja'];
        }
        else {
            this.displayedColumns = ['dzien', 'sniadanie', 'obiad', 'kolacja'];
        }
    };
    TabelaJadlospisComponent.prototype.openDialogZapisz = function () {
        var _this = this;
        var dialogRef = this.dialog.open(zapisz_modal_component_1.ZapiszModalComponent, {
            width: '300px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (dieta) {
            if (dieta) {
                console.log('result', dieta);
                _this.dieta = dieta;
                _this.dieta.dane = [
                    JSON.stringify(_this.dania[0]),
                    JSON.stringify(_this.dania[1]),
                    JSON.stringify(_this.dania[2]),
                    JSON.stringify(_this.dania[3]),
                    JSON.stringify(_this.dania[4]),
                    JSON.stringify(_this.dania[5]),
                    JSON.stringify(_this.dania[6]),
                ];
                // this.dieta.dane = this.dania;
                _this.dietaService.saveDiety(_this.dieta).subscribe();
            }
        });
    };
    TabelaJadlospisComponent.prototype.downloadPdf = function () {
        // var prepare=[];
        // this.Listtrackigobjct.forEach(e=>{
        //   var tempObj =[];
        //   // tempObj.push(e.FullName);
        //   // tempObj.push(e.DepartmentName);
        //   // tempObj.push( e.CurrentCarType);
        //   // tempObj.push( e.CurrentCarModelString);
        //   // tempObj.push( e.CurrentModelYear);
        //   // tempObj.push(e.CurrentFuelTypeEnum);
        //   // tempObj.push(e.FuelContainerCapacity);
        //   // tempObj.push(e.MileageFloat);
        //   // prepare.push(tempObj);
        // });
        // const doc = new jsPDF();
        // autoTable({
        //     // head: [['dzien','','sniadanie','','obiad','','kolacja']],
        //     head: [this.displayedColumns],
        //     body: this.dieta.dane
        // });
        // doc.save('dieta' + '.pdf');
    };
    // }
    // print() { }
    //   print = () => {
    //   let doc = new jsPDF();
    //   doc.autoTable({
    //     head: [['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']],
    //     // body: this.getLiveData() //returning [["log1", "$100"], ["log2", "$200"]]
    //     body: this.dataSource //returning [["log1", "$100"], ["log2", "$200"]]
    //   });
    //   doc.save('table.pdf')
    // }
    // print() {
    //   let doc = new jsPDF();
    //   let data = [];
    //   const displayedColumns = ['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']
    //   this.dataSource.forEach(obj => {
    //     let arr = [];
    //     this.displayedColumns.forEach(col => {
    //       arr.push(obj[col]);
    //     });
    //     data.push(arr);
    //   });
    //   doc.autoTable({
    //     head: [['dzien', 'sniadanie', 'obiad', 'podwieczorek', 'kolacja']],
    //     body: data
    //   });
    //   doc.save('table.pdf');
    // }
    // openDialogZapisaneDiety(): void {
    //   this.dietaService.loadDiety(1).subscribe();
    // }
    TabelaJadlospisComponent.prototype.openDialogZapisaneDiety = function () {
        this.dietaService.loadAllDiety().subscribe();
    };
    __decorate([
        core_1.Output()
    ], TabelaJadlospisComponent.prototype, "outRecord");
    __decorate([
        core_1.Output()
    ], TabelaJadlospisComponent.prototype, "outDania");
    __decorate([
        core_1.Output()
    ], TabelaJadlospisComponent.prototype, "outSecondBreakfast");
    __decorate([
        core_1.Output()
    ], TabelaJadlospisComponent.prototype, "outAfternoonSnack");
    TabelaJadlospisComponent = __decorate([
        core_1.Component({
            selector: 'app-tabela-jadlospis',
            templateUrl: './tabela-jadlospis.component.html',
            styleUrls: ['./tabela-jadlospis.component.scss']
        })
    ], TabelaJadlospisComponent);
    return TabelaJadlospisComponent;
}());
exports.TabelaJadlospisComponent = TabelaJadlospisComponent;
exports.ELEMENT_DATA = [
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.PONIEDZIALEK },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.WTOREK },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.SRODA },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.CZWARTEK },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.PIATEK },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.SOBOTA },
    { dzien: dni_tygodnia_enum_1.DniTygodniaEnum.NIEDZIELA }
];
