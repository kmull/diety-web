"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JadlospisModule = void 0;
var formularz_component_1 = require("./formularze/formularz/formularz.component");
var expansion_1 = require("@angular/material/expansion");
var input_1 = require("@angular/material/input");
var table_1 = require("@angular/material/table");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var select_1 = require("@angular/material/select");
var table_2 = require("@angular/cdk/table");
var jadlospis_routing_module_1 = require("./jadlospis-routing.module");
var tabela_jadlospis_component_1 = require("./tabela-jadlospis/tabela-jadlospis.component");
var card_1 = require("@angular/material/card");
var sniadanie_component_1 = require("./formularze/sniadanie/sniadanie.component");
var obiad_form_component_1 = require("./formularze/obiad/obiad-form.component");
var drugie_sniadanie_form_component_1 = require("./formularze/drugie-sniadanie-form/drugie-sniadanie-form.component");
var podwieczorek_form_component_1 = require("./formularze/podwieczorek/podwieczorek-form.component");
var icon_1 = require("@angular/material/icon");
var jadlospis_dashboard_component_1 = require("./dashboard/jadlospis-dashboard.component");
var button_1 = require("@angular/material/button");
var checkbox_1 = require("@angular/material/checkbox");
var mat_table_exporter_1 = require("mat-table-exporter");
var zapisz_modal_component_1 = require("./tabela-jadlospis/zapisz-modal/zapisz-modal.component");
var dialog_1 = require("@angular/material/dialog");
var JadlospisModule = /** @class */ (function () {
    function JadlospisModule() {
    }
    JadlospisModule = __decorate([
        core_1.NgModule({
            declarations: [
                tabela_jadlospis_component_1.TabelaJadlospisComponent,
                formularz_component_1.FormularzComponent,
                sniadanie_component_1.SniadanieComponent,
                obiad_form_component_1.ObiadFormComponent,
                drugie_sniadanie_form_component_1.DrugieSniadanieFormComponent,
                podwieczorek_form_component_1.PodwieczorekFormComponent,
                jadlospis_dashboard_component_1.JadlospisDashboardComponent,
                zapisz_modal_component_1.ZapiszModalComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                card_1.MatCardModule,
                table_1.MatTableModule,
                table_2.CdkTableModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                expansion_1.MatExpansionModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                checkbox_1.MatCheckboxModule,
                mat_table_exporter_1.MatTableExporterModule,
                dialog_1.MatDialogModule,
                jadlospis_routing_module_1.JadlospisRoutingModule
            ]
        })
    ], JadlospisModule);
    return JadlospisModule;
}());
exports.JadlospisModule = JadlospisModule;
