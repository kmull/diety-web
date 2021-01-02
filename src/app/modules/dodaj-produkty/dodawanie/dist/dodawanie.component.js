"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DodawanieComponent = void 0;
var drugie_sniadanie_const_1 = require("./../../../models/objects/drugie-sniadanie-const");
var obiad_const_1 = require("../../../models/objects/obiad-const");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var model_1 = require("../../../models/model");
var rodzaj_dania_enum_1 = require("../../../models/enums/rodzaj-dania-enum");
var sniadanie_const_1 = require("../../../models/objects/sniadanie-const");
var meal_type_enum_1 = require("src/app/models/enums/meal-type-enum");
var DodawanieComponent = /** @class */ (function () {
    function DodawanieComponent(mealDinnerService, fb) {
        this.mealDinnerService = mealDinnerService;
        this.fb = fb;
        this.meal = new model_1.Model();
        this.form = this.fb.group({
            name: ['', forms_1.Validators.required]
        });
        this.mealTypeOption = [
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.PODWIECZOREK },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.KOLACJA },
        ];
    }
    DodawanieComponent.prototype.ngOnInit = function () { };
    DodawanieComponent.prototype.changeMealtype = function (mealType) {
        this.selectedMealType = mealType;
        switch (mealType) {
            case rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE:
                this.typeOption = sniadanie_const_1.SniadanieConst;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE:
                this.selectedType = 'drugie-sniadanie';
                this.typeOption = drugie_sniadanie_const_1.DrugieSniadanieConst;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD:
                this.typeOption = obiad_const_1.ObiadConst;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.PODWIECZOREK:
                this.typeOption = sniadanie_const_1.SniadanieConst;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.KOLACJA:
                this.selectedMealType = rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE;
                this.typeOption = sniadanie_const_1.SniadanieConst;
                break;
        }
    };
    DodawanieComponent.prototype.changeType = function (type) {
        this.selectedType = type === meal_type_enum_1.MealTypeEnum.ZUPA_MLECZNA ? meal_type_enum_1.MealTypeEnum.DANIE_GLOWNE : type;
    };
    DodawanieComponent.prototype.onSave = function () {
        var _this = this;
        this.meal.name = this.form.get('name').value;
        if (this.form.valid) {
            this.mealDinnerService
                .saveMeal(this.selectedMealType, this.selectedType, this.meal)
                .subscribe(function () {
                _this.meal = new model_1.Model();
                _this.form.reset();
            });
        }
    };
    DodawanieComponent = __decorate([
        core_1.Component({
            selector: 'app-dodawanie',
            templateUrl: './dodawanie.component.html',
            styleUrls: ['./dodawanie.component.scss']
        })
    ], DodawanieComponent);
    return DodawanieComponent;
}());
exports.DodawanieComponent = DodawanieComponent;
