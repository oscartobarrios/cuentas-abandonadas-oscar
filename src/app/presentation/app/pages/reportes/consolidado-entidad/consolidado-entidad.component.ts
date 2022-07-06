import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-consolidado-entidad',
  templateUrl: './consolidado-entidad.component.html',
  styleUrls: ['./consolidado-entidad.component.css']
})
export class ConsolidadoEntidadComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('estadoTemplate', { static: true }) estadoTemplate: TemplateRef<any>;
  
  fechaCorte: string;
  public columns = [];
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  type: string;

  constructor(private _route: ActivatedRoute,
              private alarma: SweetAlertService) { 
    this._route.params.subscribe(params => {
      this.type = params.type;
    })
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'nombreCargue', name: 'Nombre cargue' },
      { prop: 'fechaCargue', name: 'Fecha cargue' },
      { prop: 'nroCuenta', name: 'Número cuenta' },
      { prop: 'monto', name: 'Monto', cellTemplate: this.monedaTemplate },
      { prop: 'tasaPonderada', name: 'Tasa ponderada', cellTemplate: this.numberTemplate},
      { prop: 'totalRemuneracionAcumulada', name: 'Remuneración acumulada', cellTemplate: this.monedaTemplate },

    ];
  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

 // Conulta de registros
  consultarRegistros(): void {

    if(!this.fechaCorte){
      this.alarma.showWarning("Debe seleccionar la fecha de corte para realizar la consulta");
    }else{
      // const preloader = this._notifications.showPreloader();
      // this._getarchivousecase.GetDetalladoFilter(this.page)
      //   .subscribe(res => {
      //     this.configurarTablaConRespuesta(res);
      //     preloader.close();
      //   });
    }
  }

  descargarExcel(){

  }

  buscar(){

  }

}
