"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrzyciskiComponent = void 0;
var core_1 = require("@angular/core");
var PrzyciskiComponent = /** @class */ (function () {
    function PrzyciskiComponent() {
        this.outOpenDialogZapisz = new core_1.EventEmitter();
        this.outOpenDialogZapisaneDiety = new core_1.EventEmitter();
        this.outDrukuj = new core_1.EventEmitter();
        this.outResetDanie = new core_1.EventEmitter();
        this.outResetRow = new core_1.EventEmitter();
        this.outResetTable = new core_1.EventEmitter();
        this.resetDanieOptions = [
            { value: 'sniadanie', viewValue: 'Śniadanie' },
            { value: 'drugieSniadanie', viewValue: 'Drugie śniadanie' },
            { value: 'obiad', viewValue: 'Obiad' },
            { value: 'podwieczorek', viewValue: 'Podwieczorek' },
            { value: 'kolacja', viewValue: 'Kolacja' }
        ];
    }
    PrzyciskiComponent.prototype.ngOnInit = function () {
    };
    PrzyciskiComponent.prototype.resetDanie = function () {
        this.outResetDanie.emit(this.selectedResetDanieOption);
        this.selectedResetDanieOption = null;
    };
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outOpenDialogZapisz");
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outOpenDialogZapisaneDiety");
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outDrukuj");
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outResetDanie");
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outResetRow");
    __decorate([
        core_1.Output()
    ], PrzyciskiComponent.prototype, "outResetTable");
    __decorate([
        core_1.Input()
    ], PrzyciskiComponent.prototype, "tableView");
    __decorate([
        core_1.Input()
    ], PrzyciskiComponent.prototype, "selectedDzien");
    __decorate([
        core_1.Input()
    ], PrzyciskiComponent.prototype, "isSecondBreakfast");
    __decorate([
        core_1.Input()
    ], PrzyciskiComponent.prototype, "isAfternoonSnack");
    __decorate([
        core_1.Input()
    ], PrzyciskiComponent.prototype, "selectedDania");
    PrzyciskiComponent = __decorate([
        core_1.Component({
            selector: 'app-przyciski',
            templateUrl: './przyciski.component.html',
            styleUrls: ['./przyciski.component.scss']
        })
    ], PrzyciskiComponent);
    return PrzyciskiComponent;
}());
exports.PrzyciskiComponent = PrzyciskiComponent;
