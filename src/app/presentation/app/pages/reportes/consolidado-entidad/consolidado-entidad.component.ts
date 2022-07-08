import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-consolidado-entidad',
  templateUrl: './consolidado-entidad.component.html',
  styleUrls: ['./consolidado-entidad.component.css']
})
export class ConsolidadoEntidadComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  
  fechaCorte: string;
  public columns = [];
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  type: string;
  public resultSearch = false;
  public dataQuery: any[] = [];
  usuario:any;
  idOrganizacion: any;

  constructor(private _route: ActivatedRoute,
              private alarma: SweetAlertService,
              private _notifications: NotificationsService,
              private _getreportecase: GetReporteService,
              private _storageservice: StorageService,
              ) { 
    this._route.params.subscribe(params => {
      this.type = params.type;
      this.setDefaultValues();
    })
  }

  setDefaultValues() {
   
    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;
  }

  ngOnInit(): void {

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;

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

 
  descargarExcel(){

  }

  buscar(){

    if(this.fechaCorte === undefined || this.fechaCorte === "undefined" || this.fechaCorte === "")
    {
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
      return;
    }

    this.setPage({ offset: 0 });
    this.page.data = {
      "entidad": this.idOrganizacion,      
      "fechaFinal": this.fechaCorte
    };
    
    this.consultarRegistros();


  }

  // Conulta de registros
 consultarRegistros(): void {
  const preloader = this._notifications.showPreloader();
  
  this._getreportecase.GetConsolidadoEntidadFilter(this.page)
    .subscribe(res => {

      console.log(res);

      this.configurarTablaConRespuesta(res);
      preloader.close();
    });
    
  }

   // Configuración de la tabla con respuesta
   private configurarTablaConRespuesta(modelo: any): void {
    //this.loadingService.loadingOff();
    this.resultSearch = true;
    this.dataQuery = modelo.data;
    this.rows = modelo.data;
    this.definirValoresPagina(modelo);
    if (this.rows === null || this.rows.length === 0) {
      this.resultSearch = false;
    }
  }
   // definicion de valores del paginador
   private definirValoresPagina(values): void {
    this.page.pageNumber = values.pageNumber;
    this.page.size = values.size;
    this.page.totalElements = values.totalElements;
    this.page.totalPages = values.totalPages;
  }

}
