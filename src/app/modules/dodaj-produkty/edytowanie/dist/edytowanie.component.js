"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EdytowanieComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var model_1 = require("../../../models/model");
var rodzaj_dania_enum_1 = require("../../../models/enums/rodzaj-dania-enum");
var meal_type_general_enum_1 = require("../../../models/enums/meal-type-general-enum");
var sniadanie_const_1 = require("../../../models/objects/sniadanie-const");
var drugie_sniadanie_const_1 = require("../../../models/objects/drugie-sniadanie-const");
var obiad_const_1 = require("../../../models/objects/obiad-const");
var meal_type_enum_1 = require("../../../models/enums/meal-type-enum");
var EdytowanieComponent = /** @class */ (function () {
    function EdytowanieComponent(mealDinnerService, fb) {
        this.mealDinnerService = mealDinnerService;
        this.fb = fb;
        this.meal = new model_1.Model();
        this.rodzajDaniaEnum = rodzaj_dania_enum_1.RodzajDaniaEnum;
        this.form = this.fb.group({
            name: ['', forms_1.Validators.required],
            skladnik: ['', forms_1.Validators.required]
        });
        this.mealTypeOption = [
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD },
            { name: rodzaj_dania_enum_1.RodzajDaniaEnum.PODWIECZOREK },
        ];
        this.podwieczorekValues$ = this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.PODWIECZOREK);
        this.drugieSniadanieValues$ = this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.DRUGIE_SNIADANIE);
    }
    EdytowanieComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    EdytowanieComponent.prototype.loadData = function () {
        // tslint:disable-next-line: deprecation
        this.obiadValues$ = rxjs_1.forkJoin(this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD, meal_type_general_enum_1.MealTypeGeneralEnum.ZUPA), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD, meal_type_general_enum_1.MealTypeGeneralEnum.DANIE_GLOWNE), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD, meal_type_general_enum_1.MealTypeGeneralEnum.SUROWKA), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD, meal_type_general_enum_1.MealTypeGeneralEnum.DODATKI)).pipe(operators_1.map(function (_a) {
            var soup = _a[0], dinner = _a[1], salad = _a[2], additions = _a[3];
            return { soup: soup, dinner: dinner, salad: salad, additions: additions };
        }));
        // tslint:disable-next-line: deprecation
        this.$sniadanieValues = rxjs_1.forkJoin(this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.PIECZYWO), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.DANIE_GLOWNE), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.NABIAL), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.WEDLINA), this.mealDinnerService.getDinner(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE, meal_type_general_enum_1.MealTypeGeneralEnum.WARZYWO)).pipe(operators_1.map(function (_a) {
            var pieczywo = _a[0], danieGlowne = _a[1], nabial = _a[2], wedlina = _a[3], warzywo = _a[4];
            return { pieczywo: pieczywo, danieGlowne: danieGlowne, nabial: nabial, wedlina: wedlina, warzywo: warzywo };
        }));
    };
    EdytowanieComponent.prototype.addObiadValues$ = function (type) {
        var _this = this;
        this.obiadValues$.subscribe(function (values) {
            _this.soup = values.soup;
            _this.obiadGlowne = values.dinner;
            _this.surowka = values.salad;
            _this.dodatki = values.additions;
            if (type) {
                _this.selectSniadanie(type);
            }
        });
    };
    EdytowanieComponent.prototype.addSniadanieValues$ = function (type) {
        var _this = this;
        this.$sniadanieValues.subscribe(function (values) {
            _this.pieczywo = values.pieczywo;
            _this.sniadanieGlowne = values.danieGlowne;
            _this.nabial = values.nabial;
            _this.wedlina = values.wedlina;
            _this.warzywo = values.warzywo;
            if (type) {
                _this.selectSniadanie(type);
            }
        });
    };
    EdytowanieComponent.prototype.addPodwieczorekValues$ = function (type) {
        var _this = this;
        this.podwieczorekValues$.subscribe(function (values) {
            _this.podwieczorek = values;
            if (type) {
                _this.modelList = _this.podwieczorek;
            }
        });
    };
    EdytowanieComponent.prototype.addDrugieSniadanieValues$ = function (type) {
        var _this = this;
        this.drugieSniadanieValues$.subscribe(function (values) {
            _this.drugieSniadanie = values;
            if (type) {
                _this.modelList = _this.drugieSniadanie;
            }
        });
    };
    EdytowanieComponent.prototype.changeMealtype = function (mealType) {
        this.selectedMealType = mealType;
        this.selectedType = mealType;
        switch (mealType) {
            case rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE:
                this.typeOptions = sniadanie_const_1.SniadanieConst;
                this.addSniadanieValues$(this.selectedType);
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE:
                this.typeOptions = drugie_sniadanie_const_1.DrugieSniadanieConst;
                this.addDrugieSniadanieValues$(this.selectedType);
                this.modelList = this.drugieSniadanie;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD:
                this.typeOptions = obiad_const_1.ObiadConst;
                this.addObiadValues$(this.selectedType);
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.PODWIECZOREK:
                this.typeOptions = sniadanie_const_1.SniadanieConst;
                this.addPodwieczorekValues$(this.selectedType);
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.KOLACJA:
                this.typeOptions = sniadanie_const_1.SniadanieConst;
                this.addPodwieczorekValues$(this.selectedType);
                break;
        }
    };
    EdytowanieComponent.prototype.changeType = function (type) {
        this.selectedType = type;
        switch (this.selectedMealType) {
            case rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE:
                this.selectSniadanie(this.selectedType);
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.OBIAD:
                this.selectObiad(this.selectedType);
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.PODWIECZOREK:
                this.modelList = this.podwieczorek;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.DRUGIE_SNIADANIE:
                this.modelList = this.drugieSniadanie;
                break;
            case rodzaj_dania_enum_1.RodzajDaniaEnum.KOLACJA:
                this.selectedType = rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE;
                this.selectSniadanie(rodzaj_dania_enum_1.RodzajDaniaEnum.SNIADANIE);
                break;
        }
    };
    EdytowanieComponent.prototype.selectObiad = function (type) {
        switch (type) {
            case meal_type_enum_1.MealTypeEnum.ZUPA:
                this.modelList = this.soup;
                break;
            case meal_type_enum_1.MealTypeEnum.DANIE_GLOWNE:
                this.modelList = this.obiadGlowne;
                break;
            case meal_type_enum_1.MealTypeEnum.SUROWKA:
                this.modelList = this.surowka;
                break;
            case meal_type_enum_1.MealTypeEnum.DODATKI:
                this.modelList = this.dodatki;
                break;
        }
    };
    EdytowanieComponent.prototype.selectSniadanie = function (type) {
        switch (type) {
            case meal_type_enum_1.MealTypeEnum.PIECZYWO:
                this.modelList = this.pieczywo;
                break;
            case meal_type_enum_1.MealTypeEnum.DANIE_GLOWNE:
                this.modelList = this.sniadanieGlowne;
                break;
            case meal_type_enum_1.MealTypeEnum.NABIAL:
                this.modelList = this.nabial;
                break;
            case meal_type_enum_1.MealTypeEnum.WEDLINA:
                this.modelList = this.wedlina;
                break;
            case meal_type_enum_1.MealTypeEnum.WARZYWO:
                this.modelList = this.warzywo;
                break;
        }
    };
    EdytowanieComponent.prototype.changeModel = function (item) {
        this.meal = item;
        this.form.get('name').setValue(this.meal.name);
    };
    EdytowanieComponent.prototype.onSave = function () {
        var _this = this;
        this.meal.name = this.form.get('name').value;
        if (!!this.meal.name && !!this.selectedType) {
            this.mealDinnerService.saveMeal(this.selectedMealType, this.selectedType, this.meal)
                .subscribe(function () {
                _this.modelList = _this.modelList.slice();
                _this.meal = new model_1.Model();
                _this.mealDinnerService.getDinner(_this.selectedMealType, _this.selectedType)
                    .subscribe(function (dishes) { return _this.modelList = dishes; });
                _this.selectedType = null;
                _this.form.reset();
            });
        }
    };
    EdytowanieComponent.prototype.onRemove = function () {
        var _this = this;
        if (!!this.meal.name && !!this.selectedType) {
            this.mealDinnerService.removeMeal(this.selectedMealType, this.meal)
                .subscribe(function () {
                _this.changeMealtype(_this.selectedMealType);
                _this.modelList = _this.modelList.filter(function (f) { return f.id !== _this.meal.id; }).slice();
                _this.mealDinnerService.getDinner(_this.selectedMealType, _this.selectedType)
                    .subscribe(function (dishes) { return _this.modelList = dishes; });
                _this.meal = new model_1.Model();
                _this.form.reset();
            });
        }
    };
    EdytowanieComponent = __decorate([
        core_1.Component({
            selector: 'app-edytowanie',
            templateUrl: './edytowanie.component.html',
            styleUrls: ['./edytowanie.component.scss']
        })
    ], EdytowanieComponent);
    return EdytowanieComponent;
}());
exports.EdytowanieComponent = EdytowanieComponent;
